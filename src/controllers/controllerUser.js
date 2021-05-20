const { UserService, AuthService } = require('../services')

const serviceUser = new UserService()
const serviceAuth = new AuthService()

const signup = async (req, res, next) => {
  const { name, login, password } = req.body
  const user = await serviceUser.findByEmail(login)
  if (user) {
    return res.json({
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

const login = async (req, res, next) => {
  const { login, password } = req.body
  const user = await serviceUser.findByEmail(login)
  if (!user) {
    return res.json({
      status: 404,
      message: `This login: ${login} was not found`,
      data: 'Not found',
    })
  }
  try {
    const token = await serviceAuth.login(login, password)
    if (token) {
      return res.status(200).json({
        status: 'Success',
        code: 200,
        message: `User with login: '${login}' logged in!`,
        data: {
          token
        }
      })
    }
    res.json({
      status: 'Error',
      code: 401,
      message: 'Invalid creadentials',
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  const id = req.user.id
  console.log(id)
  await serviceAuth.logout(id)
  return res.status(204).json({
    status: 'Success',
    code: 204,
    // message: 'User logout!'
  })
}

module.exports = {
  signup,
  login,
  logout,
}
