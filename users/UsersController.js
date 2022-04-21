const express = require('express');

const router = express.Router();

const User = require('./User');

const auth = require('../middlewares/auth');

const bcrypt = require('bcryptjs');

router.get('/admin/users', auth, async (request, response) => {
  const users = await User.findAll({raw: true});

  return response.render('users/index', {
    users,
  });
});

router.get('/admin/users/create', async (request, response) => {
  return response.render('users/create');
});

router.post('/admin/users/save', async (request, response) => {
  const {name, email, password} = request.body;

  if (!name || !email || !password) return response.redirect('/');

  const emailVerify = await User.findOne({
    where: {
      email,
    },
  });

  if (emailVerify) return response.redirect('/admin/users/create');

  await User.create({name, email, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))});

  return response.redirect('/admin/users');
});

router.get('/admin/users/login', (request, response) => {
  return response.render('users/login');
});

router.post('/admin/users/authenticate', async (request, response) => {
  const {email, password} = request.body;

  if (!email || !password) return response.redirect('/admin/users/login');

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) return response.redirect('/admin/users/login');

  if (!bcrypt.compareSync(password, user.password)) return response.redirect('/admin/users/login');

  request.session.user = {
    id: user.id,
    email: user.email,
  };

  return response.redirect('/admin/users');
});

router.get('/admin/users/logout', (request, response) => {
  request.session.user = null;

  return response.redirect('/');
});

module.exports = router;
