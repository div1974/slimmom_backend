const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const userDaySchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now()
    },
    // title: {
    //   ua: {
    //     type: String,
    //   },
    //   ru: {
    //     type: String,
    //   },
    // },
    // foods: {
    // type: Object,
    // nameProduct: { type: String },
    weight: {
      type: Number,
      default: 100
    },
    calories: { type: Number },
    // },
    groupBloodNotAllowed: {
      type: [Boolean],
      required: [true, 'Blood type is required'],
      default: false,
    },
    summary: {
      rest: Number,
      intake: Number,
      dailyRate: Number,
      ratio2Norma: String
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  { versionKey: false }
)
userDaySchema.plugin(mongoosePaginate)
const UserDay = model('UserDay', userDaySchema)

module.exports = UserDay
