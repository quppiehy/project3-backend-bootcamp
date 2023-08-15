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
    router.post(
      "/addresses/:userId",
      this.controller.findOrCreateAddress.bind(this.controller)
    );
    router.get(
      "/address/:userId",
      this.controller.getOneAddress.bind(this.controller)
    );

    router.post("/login", this.controller.login.bind(this.controller)); //login
    router.put("/", this.controller.updateUserInfo.bind(this.controller));
    router.put(
      "/addresses",
      this.controller.updateAddressInfo.bind(this.controller)
    );

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
