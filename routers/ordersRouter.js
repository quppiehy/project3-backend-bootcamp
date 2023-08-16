const express = require("express");
const router = express.Router();

class OrdersRouter {
  constructor(controller) {
    this.controller = controller;
    // this.jwtCheck = jwtCheck;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/list", this.controller.getAllOrders.bind(this.controller));
    router.get("/:orderId", this.controller.getOne.bind(this.controller));
    router.get(
      "/list/:userId",
      this.controller.getAllOrdersForUser.bind(this.controller)
    );
    router.get(
      "/shippingmethods/list",
      this.controller.getAllShippingMethods.bind(this.controller)
    );

    return router;
  }
}

module.exports = OrdersRouter;
