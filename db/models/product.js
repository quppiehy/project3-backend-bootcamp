"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.review);
      this.hasMany(models.like);
      this.hasMany(models.chat, { foreignKey: "productId" });
      this.hasMany(models.photo);
      this.belongsTo(models.seller_discount, {
        foreignKey: "sellerDiscountId",
      });
      this.belongsTo(models.category, {
        foreignKey: "categoryId",
      });
      this.belongsToMany(models.user, {
        through: "user_product",
        foreignKey: "productId",
        // as: "products",
      });
      this.belongsToMany(models.current_cart, {
        through: "current_cart_product",
      });
      this.belongsToMany(models.order, {
        through: "product_order",
      });
      this.belongsTo(models.user, {
        foreignKey: "sellerId",
        // as: "seller",
      });
    }
  }
  Product.init(
    {
      sellerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      sellerDiscountId: {
        type: DataTypes.INTEGER,
        references: {
          model: "seller_discount",
          key: "id",
        },
      },
      title: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      description: DataTypes.TEXT,
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "category",
          key: "id",
        },
      },
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "product",
      underscored: true,
    }
  );
  return Product;
};

// 1 user can sell many products
