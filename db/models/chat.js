"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      this.belongsTo(models.product, {
        foreignKey: "productId",
        // as: "productChat",
      });
      this.belongsTo(models.user, { foreignKey: "userId" });
      this.belongsTo(models.user, { foreignKey: "sellerId" });
      this.hasMany(models.chat_message);
    }
  }
  Chat.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: "product",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      sellerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "chat",
      underscored: true,
    }
  );
  return Chat;
};
