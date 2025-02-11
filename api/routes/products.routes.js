const express = require('express');

const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  schemaRead,
  schemaInsert,
  schemaUpdate
} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/:id',
  validatorHandler(schemaRead, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);

    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(schemaInsert, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

router.patch('/:id',
  validatorHandler(schemaRead, 'params'),
  validatorHandler(schemaUpdate, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);

    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', validatorHandler(schemaRead, 'params'), async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

module.exports = router;