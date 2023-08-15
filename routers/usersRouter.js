const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller) {
    this.controller = controller;
    // this.jwtCheck = jwtCheck;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:userId", this.controller.getOne.bind(this.controller));
    router.post("/login", this.controller.login.bind(this.controller)); //login
    // Add this line to your UsersRouter.js to include the new updateUser route
    router.post("/", this.controller.updateUserInfo.bind(this.controller));

    // router.post(
    //   "/",
    // this.jwtCheck,
    //   this.controller.insertOne.bind(this.controller)
    // );
    // router.post("/login", this.controller.login.bind(this.controller));

    // router.put(
    //   "/:listingId",
    //   // this.jwtCheck,
    //   this.controller.buyItem.bind(this.controller)
    // );
    return router;
  }
}

module.exports = UsersRouter;
