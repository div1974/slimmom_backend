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
    return product;
  }
  async getUserById(owner) {
    const user = await this.modelUser.findOne({ _id: owner });
    return user;
  }

  async addProduct(user, product, day, weight) {
    const { _id, title, calories } = product;
    const convertedCalories = calories * (weight / 100);
    const formatDay = dayjs(day).format("DD-MM-YYYY");
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
      owner: user._id,
      summary: {
        rest: 0,
        intake: 0,
        dailyRate: user.dailyCalorieIntake,
        ratio2Norma: 0,
      },
    };
    const checkDay = await this.modelUserDay.findOne({
      $and: [{ day: formatDay }, { owner: user._id }],
    });
    if (checkDay) {
      checkDay.foods.push({
        _id: _id,
        title: {
          ua: title.ua,
          ru: title.ru,
        },
        weight: weight,
        cal: convertedCalories,
      });

      checkDay.summary = {
        rest:
          checkDay.summary.rest - convertedCalories <= 0
            ? 0.0
            : checkDay.summary.rest - convertedCalories,
        intake: checkDay.summary.intake + convertedCalories,
        dailyRate: user.dailyCalorieIntake,
        ratio2Norma: Math.round(
          ((checkDay.summary.intake + convertedCalories) /
            checkDay.summary.dailyRate) *
            100
        ),
      };

      return await checkDay.save();
    }
    userDay.summary = {
      rest:
        convertedCalories >= user.dailyCalorieIntake
          ? 0.0
          : user.dailyCalorieIntake - convertedCalories,
      intake: convertedCalories,
      dailyRate: user.dailyCalorieIntake,
      ratio2Norma: Math.round(
        (convertedCalories / user.dailyCalorieIntake) * 100
      ),
    };
    const products = await this.modelUserDay.create(userDay);
    return products;
  }

  async removeProductById(user, delProductId, day) {
    console.log("owner", user);
    const formatDay = dayjs(day).format("DD-MM-YYYY");

    const checkDay = await this.modelUserDay.findOne({
      $and: [{ day: formatDay }, { owner: user._id }],
    });

    if (checkDay) {
      const prod = checkDay.foods.find(
        (product) => product._id === delProductId
      );
      const proIndex = checkDay.foods.indexOf(prod);
      console.log("proIndex", proIndex);
      const newArr = checkDay.foods.splice(proIndex, 1);
      if (proIndex > -1) {
        console.log("Зашли");
        const delProduct = await this.modelUserDay.updateOne(
          {},
          { [checkDay.foods]: checkDay.foods }
        );
        checkDay.summary = {
          rest: checkDay.summary.rest + prod.cal,
          intake: checkDay.summary.intake - prod.cal,
          dailyRate: user.dailyCalorieIntake,
          ratio2Norma: Math.round(
            ((checkDay.summary.intake - prod.cal) /
              checkDay.summary.dailyRate) *
              100
          ),
        };
        return await checkDay.save();
      }
    }
    console.log("checkDay", checkDay);
  }

  async findUserDay(user, day) {
    const formatDay = dayjs(day).format("DD-MM-YYYY");
    const checkDay = await this.modelUserDay.findOne({
      $and: [{ day: formatDay }, { owner: user._id }],
    });
    if (checkDay) {
      return checkDay;
    }
  }
}

module.exports = EatenProductDay;
