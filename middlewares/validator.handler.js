const Boom = require('@hapi/boom')

/** 
 * @param {import('joi').Schema} schema 
 * @param {'body'|'query'|'params'} property 
 */
function validatorHandler(schema, property = "body") {

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  return (req, res, next) => {
    const data = req[property]
    const { error, value } = schema.validate(data, { stripUnknown: true })

    console.log('value: ', value);

    if (error)
      next(Boom.badRequest(error))

    next();
  }
}

module.exports = validatorHandler