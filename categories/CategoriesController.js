const express = require('express');
const router = express.Router();

const Category = require('./Category');

const auth = require('../middlewares/auth');

const slugify = require('slugify');

router.get('/admin/categories', auth, async (request, response) => {
  const categories = await Category.findAll({raw: true});

  return response.render('admin/categories/index', {
    categories,
  });
});

router.get('/admin/categories/create', auth, (request, response) => {
  return response.render('admin/categories/create');
});

router.post('/admin/categories/save', auth, async (request, response) => {
  const {title} = request.body;

  if (!title) return response.redirect('/admin/categories/create');

  await Category.create({
    title,
    slug: slugify(title),
  });

  return response.redirect('/admin/categories');
});

router.get('/admin/categories/edit/:id', auth, async (request, response) => {
  const {id} = request.params;

  if (!id || isNaN(id)) return response.redirect('/admin/categories');

  const category = await Category.findByPk(id);

  if (!category) return response.redirect('/admin/categories');

  return response.render('admin/categories/edit', {
    category,
  });
});

router.post('/admin/categories/update', auth, async (request, response) => {
  const {id, title} = request.body;

  if (!id || !title) return response.redirect('/admin/categories');

  await Category.update(
    {
      title,
      slug: slugify(title),
    },
    {
      where: {
        id,
      },
    },
  );

  return response.redirect('/admin/categories');
});

router.post('/admin/categories/delete', auth, async (request, response) => {
  const {id} = request.body;

  if (!id || isNaN(id)) return response.redirect('/admin/categories');

  await Category.destroy({
    where: {
      id,
    },
  });

  return response.redirect('/admin/categories');
});

module.exports = router;
