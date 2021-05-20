const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const SALT_FACTOR = 6

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: 2,
    },
    login: {
      type: String,
      required: [true, 'Login is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    // NotAllowedFoods: {
    //   type: [Boolean],
    //   default: false,
    // },
    // dailyCalorieIntake: {
    //   type: Number
    // },
    token: {
      type: String,
      default: null,
    },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    // verifyToken: {
    //   type: String,
    //   required: [true, 'Verify token is required'],
    // }
  },
  { versionKey: false, timeStamps: true }
)

userSchema.path('login').validate(function (value) {
  const reg = /\S+@\S+\.\S+/
  return reg.test(String(value).toLowerCase())
})

userSchema.methods.setPassword = async function(password) {
  this.password = await bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR))
}

userSchema.methods.validPassword = async function(password) {
  return await bcrypt.compareSync(password, this.password)
}
const User = model('User', userSchema)

module.exports = User
