const { UserService } = require('../services')

const serviceUser = new UserService()

const signup = async (req, res, next) => {
  const { name, login, password } = req.body
  const user = await serviceUser.findByEmail(login)
  if (user) {
    return next({
      status: 'Conflict',
      code: 409,
      message: 'This email is already use',
      data: 'Conflict',
    })
  }
  try {
    const newUser = await serviceUser.createUserRegistry({ name, login, password })
    console.log(newUser)
    return res.status(201).json({
      status: 'Success',
      code: 201,
      message: `User with name: '${name}' added successfully!`,
      data: {
        // user: newUser
        id: newUser.id,
        name: newUser.name,
        login: newUser.login,
        password: newUser.password,
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signup,
}
