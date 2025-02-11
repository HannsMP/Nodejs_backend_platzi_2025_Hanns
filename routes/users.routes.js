const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (!limit || !offset)
    return res.send('No hay parametros');

  res.json({
    limit,
    offset
  });
});

module.exports = router;