"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable("chat_histories", "chat_messages");
    await queryInterface.addColumn("chat_histories", {
      content: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("chat_histories", "content");
    await queryInterface.renameTable("chat_messages", "chat_histories");
  },
};
