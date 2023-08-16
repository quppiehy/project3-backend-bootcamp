"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Current_Cart_Product extends Model {
    static associate(models) {
      this.belongsTo(models.product, { foreignKey: "productId" });
      this.belongsTo(models.current_cart, { foreignKey: "currentCartId" });
    }
  }
  Current_Cart_Product.init(
    {
      currentCartId: {
        type: DataTypes.INTEGER,
        references: {
          model: "current_cart",
          key: "id",
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: "product",
          key: "id",
        },
      },
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "current_cart_product",
      underscored: true,
    }
  );
  return Current_Cart_Product;
};
