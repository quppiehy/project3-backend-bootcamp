"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("current_cart_products", "quantity", {
      allowNull: false,
      type: Sequelize.INTEGER,
    });
    await queryInterface.removeColumn("current_carts", "quantity");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("current_carts", "quantity", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.removeColumn("current_cart_products", "quantity");
  },
};
