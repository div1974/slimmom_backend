const { UserDay, Food, User } = require("../schemas");
const dayjs = require("dayjs");
const { update } = require("../schemas/food");
const { format } = require("morgan");

class EatenProductDay {
  constructor() {
    this.modelUserDay = UserDay;
    this.modelFood = Food;
    this.modelUser = User;
  }

  async getProductById(productId) {
    const product = await this.modelFood.findOne({ _id: productId });
    // console.log('productId', productId)
    // console.log('product', product)
    return product;
  }
  async getUserById(owner) {
    const user = await this.modelUser.findOne({ _id: owner });
    // console.log('owner', owner)
    return user;
  }

  async addProduct(user, product, day, weight) {
    const { _id, title, calories } = product;
    const convertedCalories = calories * (weight / 100);
    const formatDay = dayjs(day).format("DD-MM-YYYY");
    // console.log('user', user)
    const userDay = {
      day: formatDay,
      foods: [
        {
          _id: _id,
          title: {
            ua: title.ua,
            ru: title.ru,
          },
          weight: weight,
          cal: convertedCalories,
        },
      ],
      owner:user._id,
      summary: {
      rest: 0,
      intake: 0,
      dailyRate: user.dailyCalorieIntake,
      ratio2Norma: 0
        
      },
    };
    // console.log("userDay", userDay);
    const checkDay = await this.modelUserDay.findOne({
      $and: [{ day: formatDay }, {owner:user._id}],
    });
    // console.log("checkDay", checkDay);
    if (checkDay) {
      checkDay.foods.push({
        _id: _id,
        title: {
          ua: title.ua,
          ru: title.ru,
        },
        weight: weight,
        cal: convertedCalories,
      })
      
      checkDay.summary = {
      rest: checkDay.summary.rest-convertedCalories<=0? 0.00 : checkDay.summary.rest-convertedCalories,
      intake: checkDay.summary.intake+convertedCalories,
      dailyRate: user.dailyCalorieIntake,
      ratio2Norma: (checkDay.summary.intake/checkDay.summary.dailyRate)*100,
      }

     
      return await checkDay.save();
    }
    // console.log('Все хорошо')
    userDay.summary = {
      rest: convertedCalories >= user.dailyCalorieIntake? 0.00 : user.dailyCalorieIntake-convertedCalories,
      intake: convertedCalories,
      dailyRate: user.dailyCalorieIntake,
      ratio2Norma: (convertedCalories/user.dailyCalorieIntake)*100,
    }
    const products = await this.modelUserDay.create(userDay);
    return products;
  }

  // async updateSummary(calories, foodsCalories) {
  //   // console.log();
  //   const updateSummary = {
  //     summary: {
  //       rest: calories - foodsCalories,
  //       intake: foodsCalories,
  //       dailyRate: calories,
  //       ratio2Norma: String,
  //     },
  //   };
  // }
}

module.exports = EatenProductDay;
