"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable("chat_histories", "chat_messages");
    await queryInterface.addColumn("chat_messages", "content", {
      allowNull: false,
      type: Sequelize.TEXT,
    });
    await queryInterface.removeColumn("chats", "content");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("chats", "content", {
      type: Sequelize.TEXT,
    });
    await queryInterface.removeColumn("chat_messages", "content");
    await queryInterface.renameTable("chat_messages", "chat_histories");
  },
};
