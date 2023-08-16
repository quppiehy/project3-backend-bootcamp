"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rating_Category extends Model {
    //static associate(models) {
      //this.hasMany(models.review);
    //}
  }
  Rating_Category.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "rating_category",
      underscored: true,
    }
  );
  return Rating_Category;
};
