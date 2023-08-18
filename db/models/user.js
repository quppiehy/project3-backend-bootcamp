"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.address);
      this.hasMany(models.order, { foreignKey: "id", as: "buyer" });
      this.hasMany(models.review);
      this.hasMany(models.chat, { foreignKey: "userId", as: "seller" });
      this.hasMany(models.chat, { foreignKey: "userId", as: "buying" });
      this.hasOne(models.current_cart);
      this.hasMany(models.like);
      this.hasMany(models.chat_message);
      this.belongsToMany(models.product, {
        through: "user_product",
        foreignKey: "userId",
        as: "sellerId",
      });
      // this.hasMany(models.product, {
      //   foreignKey: "userId",
      //   as: "productChat",
      // });
    }

    static updateUserInfo(userId, updatedUserInfo) {
      return this.update(updatedUserInfo, {
        where: { id: userId },
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      userName: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      mobileNumber: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );

  return User;
};
