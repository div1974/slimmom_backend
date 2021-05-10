const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const foodSchema = new Schema(
  {
    title: {
      ru: String,
      ua: String,
      required: [true, 'Set food title'],
    },
    categories: {
      type: String,
    },
    calories: {
      type: Number,
    },
    groupBloodNotAllowed: {
      type: [Boolean],
      default: false,
    },
   
  },
  // { versionKey: false }
)
contactSchema.plugin(mongoosePaginate)
const Food = model('Food', foodSchema)

module.exports = Food
