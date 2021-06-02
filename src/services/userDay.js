const { UserDay, Food } = require("../schemas");
const dayjs = require("dayjs");
const { update } = require("../schemas/food");
const { format } = require("morgan");

class EatenProductDay {
  constructor() {
    this.modelUserDay = UserDay;
    this.modelFood = Food;
  }

  async getProductById(productId) {
    const product = await this.modelFood.findOne({ _id: productId });
    // console.log('product', product)
    return product;
  }

  async addProduct(owner, product, day, weight) {
    const { _id, title, calories } = product;
    const convertedCalories = calories * (weight / 100);
    const formatDay = dayjs(day).format("DD-MM-YYYY");
    //
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
      owner,
      // summary: uptadeSummary(foods.cal),
    };

    const checkDay = await this.modelUserDay.findOne({
      $and: [{ day: formatDay }, { owner }],
    });
    console.log("checkDay", checkDay);
    if (checkDay) {
      // const product = await this.modelUserDay.updateOne({ _id: checkDay._id }, { [updateKey]: updateValue })
      // return product
      checkDay.foods.push({
        _id: _id,
        title: {
          ua: title.ua,
          ru: title.ru,
        },
        weight: weight,
        cal: convertedCalories,
      });
      return await checkDay.save();
    }
    const products = await this.modelUserDay.create(userDay);
    return products;
  }

  async uptadeSummary(calories, foodsCalories) {
    // console.log();
    const updateSummary = {
      summary: {
        rest: calories - foodsCalories,
        intake: foodsCalories,
        dailyRate: calories,
        ratio2Norma: String,
      },
    };
  }
}

module.exports = EatenProductDay;
