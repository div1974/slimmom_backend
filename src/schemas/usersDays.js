const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const userDaySchema = new Schema(
  {
    //
    day: { type: Date, default: Date.now },
    foods: [String],
    summary: {
      rest: Number,
      intake: Number,
      dailyRate: Number,
      ratio2Norma: String
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
  },
  { versionKey: false }
)
userDaySchema.plugin(mongoosePaginate)
const UserDay = model('UserDay', userDaySchema)

module.exports = UserDay
