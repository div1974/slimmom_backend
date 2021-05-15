const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'User Name is required'],
    }, 
    login: {
      type: String,
      required: [true, 'Login is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    
    NotAllowedFoods: {
      type: [Boolean],
      default: false,
    },

   dailyCalorieIntake:{
     type: Number
   },
    
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, 'Verify token is required'],
    }
  },
  { versionKey: false }
)

userSchema.methods.setPassword = async function(password) {
  this.password = await bcrypt.hashSync(password, bcrypt.genSaltSync())
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}
const User = model('User', userSchema)

module.exports = User
