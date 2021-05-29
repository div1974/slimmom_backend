const Joi = require('joi')

const schemaAuth = Joi.object({
  login: Joi.string().min(2).required(),
  password: Joi.string().min(2).required(),
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

module.exports.validateAuth = (req, res, next) => {
  return validate(schemaAuth, req.body, next)
}
