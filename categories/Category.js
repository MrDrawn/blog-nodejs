const Sequelize = require('sequelize');

const mysql = require('../database/mysql');

const Category = mysql.define('categories', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Category;
