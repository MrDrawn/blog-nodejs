const express = require('express');

const router = express.Router();

const Category = require('../categories/Category');
const Article = require('./Article');

const slugify = require('slugify');

router.get('/admin/articles', async (request, response) => {
  const articles = await Article.findAll({
    include: [{model: Category}],
  });

  return response.render('admin/articles/index', {
    articles,
  });
});

router.get('/articles/page/:page', async (request, response) => {
  const {page} = request.params;

  const limit = 4;

  var offset = 0;

  if (isNaN(page) || page == 1) offset = 0;
  else offset = parseInt(page) * limit;

  const articles = await Article.findAndCountAll({
    limit,
    offset,
    order: [['id', 'desc']],
  });

  var next;

  if (offset + limit >= articles.count) next = false;
  else next = true;

  var result = {
    page: parseInt(page),
    next: next,
    articles: articles,
  };

  const categories = await Category.findAll({raw: true});

  return response.render('admin/articles/page', {
    result,
    categories,
  });
});

router.get('/admin/articles/create', async (request, response) => {
  const categories = await Category.findAll({raw: true});

  return response.render('admin/articles/create', {
    categories,
  });
});

router.post('/admin/articles/save', async (request, response) => {
  const {title, content, category} = request.body;

  if (!title || !content || !category) return response.redirect('/admin/articles/create');

  await Article.create({title, content, slug: slugify(title), categoryId: category});

  return response.redirect('/admin/articles');
});

router.get('/admin/articles/edit/:id', async (request, response) => {
  const {id} = request.params;

  if (!id || isNaN(id)) return response.redirect('/admin/articles');

  const article = await Article.findByPk(id);

  if (!article) return response.redirect('/admin/articles');

  const categories = await Category.findAll({raw: true});

  return response.render('admin/articles/edit', {
    article,
    categories,
  });
});

router.post('/admin/articles/update', async (request, response) => {
  const {id, title, content, category} = request.body;

  if (!id || !title || !content || !category) return response.redirect('/admin/articles');

  await Article.update(
    {
      title,
      content,
      slug: slugify(title),
      categoryId: category,
    },
    {
      where: {
        id,
      },
    },
  );

  return response.redirect('/admin/articles');
});

router.post('/admin/articles/delete', async (request, response) => {
  const {id} = request.body;

  if (!id || isNaN(id)) return response.redirect('/admin/articles');

  await Article.destroy({
    where: {
      id,
    },
  });

  return response.redirect('/admin/articles');
});

module.exports = router;
