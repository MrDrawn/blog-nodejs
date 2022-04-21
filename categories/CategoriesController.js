const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
  response.send('Rota de categorias');
});

module.exports = router;
