const Food = require("../schemas/food");

class Products {
  constructor() {
    this.model = Food;
  }

  async getNotRecProducts(groupBloodNotAllowedIndex, query) {
    const { page, limit } = query;
    // const bloodType = this.model.find({
    //   [groupBloodNotAllowed]: { $in: [groupBloodNotAllowedIndex, true] },
    // });
    const bloodType = this.model.groupBloodNotAllowed;

    // console.log("bloodType", bloodType);
    const product = await this.model
      .find({
        groupBloodNotAllowed: { $or: [groupBloodNotAllowedIndex] },
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ "title.ru": 1, "title.ua": 1 });

    return product;
  }

  async getProductsByQuery(name, query) {
    const { page = 1, limit = 5 } = query;
    const products = await this.model
      .find({
        $or: [
          { "title.ru": { $regex: name, $options: "i" } },
          { "title.ua": { $regex: name, $options: "i" } },
        ],
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ "title.ru": 1, "title.ua": 1 });
    return products;
  }
}

module.exports = Products;
