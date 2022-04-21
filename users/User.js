const Sequelize = require('sequelize');

const mysql = require('../database/mysql');

const User = mysql.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.sync({force: false});

module.exports = User;
