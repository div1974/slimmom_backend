const Joi = require('joi')

const schemaCalculator = Joi.object({
  height: Joi.string().min(2).required(),
  age: Joi.string().min(2).required(),
  currentWeight: Joi.string().min(2).required(),
  desiredWeight: Joi.string().min(2).required(),
  groupBloodNotAllowed: Joi.array().items(null, Joi.boolean()).required(),
})

const validate = (schema, body, next) => {
  const { error } = schema.validate(body)
  if (error) {
    const [{ message }] = error.details
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, '')}`,
      data: 'Bad Request',
    })
  }
  next()
}

module.exports.validateCalc = (req, res, next) => {
  return validate(schemaCalculator, req.body, next)
}
