"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat_Message extends Model {
    static associate(models) {
      this.belongsTo(models.chat, { foreignKey: "chatId" });
      this.belongsTo(models.user, { foreignKey: "userId", as: "author" });
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
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        foreignKey: true,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "chat_message",
      underscored: true,
    }
  );
  return Chat_Message;
};
