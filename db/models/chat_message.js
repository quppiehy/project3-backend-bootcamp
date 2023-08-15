"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat_Message extends Model {
    static associate(models) {
      this.belongsTo(models.chat, { foreignKey: "chatId" });
    }
  }
  Chat_Message.init(
    {
      chatId: {
        type: DataTypes.INTEGER,
        references: {
          model: "chat",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "chat_history",
      underscored: true,
    }
  );
  return Chat_Message;
};
