const { UserService, AuthService } = require('../services')
const {getCaloriesNotRecProduct} = require('./controllersProducts')
const { ProductsServices } = require('../services')
const calculator = require('../helpers/calculator')

const serviceUser = new UserService();
const serviceAuth = new AuthService();

const signup = async (req, res, next) => {
  const { name, login, password } = req.body;
  const user = await serviceUser.findByEmail(login);
  if (user) {
    return res.status(409).json({
      status: "Error",
      code: 409,
      message: "This email is already use",
      data: "Conflict",
    });
  }
  try {
    const newUser = await serviceUser.createUserRegistry({
      name,
      login,
      password,
    });
    return res.status(201).json({
      status: "Success",
      code: 201,
      message: `User with name: '${name}' added successfully!`,
      data: {
        id: newUser.id,
        name: newUser.name,
        login: newUser.login,
        password: newUser.password,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({
      status: "Error",
      code: 400,
      message: "Login and Password fields are required",
    });
  }
  const user = await serviceUser.findByEmail(login);
  if (!user) {
    return res.status(404).json({
      status: 404,
      message: "This login was not found",
      data: "Not found",
    });
  }
  try {
    const token = await serviceAuth.login(login, password);
    if (token) {
      return res.status(200).json({
        status: "Success",
        code: 200,
        message: `User with login: '${login}' logged in!`,
        data: {
          token,
        },
      });
    }
    res.status(401).json({
      status: "Error",
      code: 401,
      message: "Invalid creadentials",
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await serviceAuth.logout(id);
  return res.status(204).json({
    status: "Success",
    code: 204,
  });
};

const updCalNotRecFoods = async (req, res, next) => {
  const userIn = req.user
  const productsServices = new ProductsServices();

  try {
    
    const { body } = req;
    const { groupBloodNotAllowed } = req.body;
    const { query } = req;
    const dailyCalories = await calculator(body);
    const products = await productsServices.getNotRecProducts(
      groupBloodNotAllowed,
      query
    );
    const notRecProducts = await products.map((product) => ({
      id: product._id,
      title: product.title,
      calories: product.calories,
    }));

        
    const UpdatedUser = await serviceUser.updateUser(userIn.id, dailyCalories, notRecProducts)
    res.json({
      status: '200 OK',
      ResponseBody: {
        user: UpdatedUser.id,
        UpdatedDailyCalorieIntake: UpdatedUser.dailyCalorieIntake,
        UpdatedNotAllowedFoods: UpdatedUser.NotAllowedFoods
        
      }
    })
  } catch (error) {
    next(error)
  }
}
module.exports = {
  signup,
  login,
  logout,
  updCalNotRecFoods
}
