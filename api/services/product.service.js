// npm i @faker-js/faker             7.2.0
const { faker } = require('@faker-js/faker');
// https://hapi.dev/module/boom/     10.0.1
const boom = require('@hapi/boom');
const Utils = require('../../utils/Utils');

class ProductsService {

  constructor() {
    this.generate();
  }

  generate() {
    this.products = Array(100).fill(null).map(_ => ({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
      isBlock: faker.datatype.boolean()
    }));
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products);
      }, Utils.randInt(500, 2000));
    })
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product)
      throw boom.notFound('product not found');

    if (product.isBlock)
      throw boom.conflict('product is block');

    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1)
      throw boom.notFound('product not found');

    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1)
      throw boom.notFound('product not found');

    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsService;