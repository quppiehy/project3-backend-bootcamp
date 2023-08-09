"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.hasMany(models.order_history);
      this.belongsTo(models.user, { foreignKey: "userId" });
      this.belongsTo(models.shipping_methods, { foreignKey: "shippingMethod" });
      this.belongsTo(models.user_discount, { foreignKey: "discountId" });
      this.belongsToMany(models.product, {
        as: "product",
        through: "product_order",
      });
    }
  }
  Order.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "user", key: "id" },
      },
      orderDate: DataTypes.DATE,
      quantity: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL,
      shippingMethod: {
        type: DataTypes.INTEGER,
        references: { model: "shipping_method", key: "id" },
      },
      discountId: {
        type: DataTypes.INTEGER,
        references: { model: "user_discount", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "order",
      underscored: true,
    }
  );
  return Order;
};