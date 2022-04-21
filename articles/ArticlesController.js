const express = require('express');

const router = express.Router();

router.get('/admin/articles', (request, response) => {
  return response.render('admin/articles/index');
});

router.get('/admin/articles/create', (request, response) => {
  return response.render('admin/articles/create');
});

module.exports = router;
