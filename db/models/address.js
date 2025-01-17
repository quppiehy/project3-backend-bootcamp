"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: "userId" });
    }
  }
  Address.init(
    {
      userId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      postalCode: DataTypes.STRING,
      contactNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "address",
      underscored: true,
    }
  );

  return Address;
};

// 1 user has many addresses
