const Joi = require("joi");

let id = Joi.string().uuid();
let name = Joi.string().min(3).max(15);
let price = Joi.number().min(10).integer();
let imagen = Joi.string().uri()

let schemaRead = Joi.object({
  id: id.required()
})

let schemaInsert = Joi.object({
  name: name.required(),
  price: price.required(),
  imagen: imagen.required()
})

let schemaUpdate = Joi.object({
  name: name,
  price: price
})

module.exports = {
  id,
  name,
  price,
  schemaRead,
  schemaInsert,
  schemaUpdate
}