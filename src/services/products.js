const Food = require("../schemas/food");

class Products {
  constructor() {
    this.model = Food;
  }

  async getNotRecProducts(groupBloodNotAllowedIndex, query) {
    const { page, limit } = query;
    
    console.log("groupBloodNotAllowedIndex",  groupBloodNotAllowedIndex)
    switch (groupBloodNotAllowedIndex) {
      case 1:{
        const product = await this.model.find({"groupBloodNotAllowed.1":true})
        .lean()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ "title.ru": 1, "title.ua": 1 });
        
        return product;
      }
      case 2:{
        const product = await this.model.find({"groupBloodNotAllowed.2":true})
        .lean()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ "title.ru": 1, "title.ua": 1 });
        
        return product;
      }
      case 3: {
        const product = await this.model.find({"groupBloodNotAllowed.3":true})
        .lean()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ "title.ru": 1, "title.ua": 1 });
        
        return product;
      }
      case 4:{
        const product = await this.model.find({"groupBloodNotAllowed.4":true})
        .lean()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ "title.ru": 1, "title.ua": 1 });
        
        return product;
      }
      default:
        alert( "Нет такой группы кровий" );
    }
    
    
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
