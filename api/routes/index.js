const express = require('express');
const categoriasRouter = require('./categorias.routes')
const productsRouter = require('./products.routes')
const usersRouter = require('./users.routes')

function routerApi(app) {
  const router = express.Router();

  router.use('/products', productsRouter)
  router.use('/users', usersRouter)
  router.use('/categoriras', categoriasRouter)

  app.use('/api/v1', router)
}

module.exports = routerApi