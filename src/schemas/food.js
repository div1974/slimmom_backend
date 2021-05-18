const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const foodSchema = new Schema(
  {
    categories: {
      type: [String],
    },
    weight: {
      type: Number,
      default: 100,
    },
    title: {
      type: Object,
      ru: {
        type: String,
      },
      ua: {
        type: String,
      },
      required: [true, 'Set food title'],
    },
    calories: {
      type: Number,
    },
    groupBloodNotAllowed: {
      type: [Boolean],
      required: [true, 'Blood type is required'],
      default: false,
    },
  },
  { versionKey: false, timeStamps: true }
)

foodSchema.plugin(mongoosePaginate)

const Food = model('Food', foodSchema)

module.exports = Food
