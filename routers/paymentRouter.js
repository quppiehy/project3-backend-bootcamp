const express = require("express");
const router = express.Router();

class PaymentRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    //routes here
    router.post("/", this.controller.Pay.bind(this.controller));
    return router;
  }
}

module.exports = PaymentRouter;
