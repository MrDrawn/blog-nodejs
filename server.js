const express = require('express');

const session = require('express-session');

const usersController = require('./users/UsersController');
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

const User = require('./users/User');
const Article = require('./articles/Article');
const Category = require('./categories/Category');

const dotenv = require('dotenv');
dotenv.config();

const mysql = require('./database/mysql');
mysql
  .authenticate()
  .then(() => console.log('Mysql connection success'))
  .catch(() => console.log('Mysql connection failed'));

const server = express();

server.set('view engine', 'ejs');

server.use(
  session({
    secret: process.env.secret,
    cookie: {
      maxAge: 3600000,
    },
  }),
);

server.use(express.static('public'));

server.use(express.urlencoded({extended: false}));
server.use(express.json());

server.get('/', async (request, response) => {
  const articles = await Article.findAll({raw: true, order: [['id', 'desc']], limit: 4});
  const categories = await Category.findAll({raw: true, order: [['id', 'desc']]});

  return response.render('index', {
    articles,
    categories,
  });
});

server.get('/:slug', async (request, response) => {
  const {slug} = request.params;

  if (!slug) return response.redirect('/');

  const article = await Article.findOne({
    where: {
      slug,
    },
  });

  if (!article) return response.redirect('/');

  const categories = await Category.findAll({raw: true, order: [['id', 'desc']]});

  return response.render('article', {
    article,
    categories,
  });
});

server.get('/category/:slug', async (request, response) => {
  const {slug} = request.params;

  if (!slug) return response.redirect('/');

  const category = await Category.findOne({
    where: {
      slug,
    },
    include: [{model: Article}],
  });

  if (!category) return response.redirect('/');

  const categories = await Category.findAll({raw: true, order: [['id', 'desc']]});

  return response.render('index', {
    articles: category.articles,
    categories,
  });
});

server.use('/', usersController);
server.use('/', categoriesController);
server.use('/', articlesController);

server.listen(3000, error => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server running in port 3000');
  }
});
