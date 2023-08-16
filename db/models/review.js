"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //this.belongsTo(models.//rating_category, {
      //  foreignKey: "ratingId",
      //});
      this.belongsTo(models.product, { foreignKey: "productId" });
      this.belongsTo(models.user, { foreignKey: "userId" });
    }
  }
  Review.init(
    {
      productId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      content: DataTypes.STRING,
      ratingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "review",
      underscored: true,
    }
  );
  return Review;
};
