const Sequelize = require('sequelize');

const dotenv = require('dotenv');
dotenv.config();

const mysql = new Sequelize(
  process.env.mysql_database,
  process.env.mysql_user,
  process.env.mysql_password,
  {
    host: process.env.mysql_hostname,
    dialect: 'mysql',
  },
);

module.exports = mysql;
