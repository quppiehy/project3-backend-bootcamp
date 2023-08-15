const express = require("express");
const router = express.Router();

class ProductsOrdersRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    // Define your routes and associate them with controller methods
    router.get("/", this.controller.getAll.bind(this.controller));
    // You can add more routes here
    router.get("/:orderId", this.controller.getOne.bind(this.controller));
    return router;
  }
}

module.exports = ProductsOrdersRouter;
