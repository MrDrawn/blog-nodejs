const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
  return response.send('Rota de artigos');
});

module.exports = router;
