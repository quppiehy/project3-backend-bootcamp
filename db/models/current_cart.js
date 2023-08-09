"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Current_Cart extends Model {
    static associate(models) {
      // define association here
      this.belongsToMany(models.product, { through: "current_cart_product" });
      this.belongsto(models.user, { foreignKey: "userId" });
    }
  }
  Current_Cart.init(
    {
      userId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "current_cart",
      underscored: true,
    }
  );
  return Current_Cart;
};