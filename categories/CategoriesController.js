const express = require('express');
const router = express.Router();

const Category = require('./Category');

const slugify = require('slugify');
const {route} = require('express/lib/application');

router.get('/admin/categories', async (request, response) => {
  const categories = await Category.findAll({raw: true});

  return response.render('admin/categories/index', {
    categories,
  });
});

router.get('/admin/categories/create', (request, response) => {
  return response.render('admin/categories/create');
});

router.post('/categories/save', async (request, response) => {
  const {title} = request.body;

  if (!title) return response.redirect('/admin/categories/create');

  await Category.create({
    title,
    slug: slugify(title),
  });

  return response.redirect('/admin/categories');
});

router.get('/categories/delete/:id', async (request, response) => {
  const {id} = request.params;

  if (!id) return response.redirect('/admin/categories');

  await Category.destroy({
    where: {
      id,
    },
  });

  return response.redirect('/admin/categories');
});

module.exports = router;
