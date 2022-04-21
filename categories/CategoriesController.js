const express = require('express');
const router = express.Router();

const Category = require('./Category');

const slugify = require('slugify');

router.get('/categories', async (request, response) => {
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

  return response.redirect('/');
});

module.exports = router;
