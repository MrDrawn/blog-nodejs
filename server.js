const express = require('express');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');

const mysql = require('./database/mysql');
mysql
  .authenticate()
  .then(() => console.log('Mysql connection success'))
  .catch(() => console.log('Mysql connection failed'));

const server = express();

server.set('view engine', 'ejs');
server.use(express.static('public'));
server.use(express.json());

server.get('/', (request, response) => {
  return response.render('index');
});

server.use('/categories', categoriesController);
server.use('/articles', articlesController);

server.listen(3000, error => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server running in port 3000');
  }
});
