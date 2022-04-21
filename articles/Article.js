const Sequelize = require('sequelize');

const mysql = require('../database/mysql');

const Category = require('../categories/Category');

const Article = mysql.define('articles', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Category.hasMany(Article);
Article.belongsTo(Category);

Article.sync({force: false});

module.exports = Article;
