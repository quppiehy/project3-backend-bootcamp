const express = require("express");
const router = express.Router();

class ProductsRouter {
  constructor(controller) {
    this.controller = controller;
    // this.jwtCheck = jwtCheck;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/list", this.controller.getAllProducts.bind(this.controller));
    router.post(
      "/search",
      this.controller.getProductsByFiltering.bind(this.controller)
    );
    router.get(
      "/categories",
      this.controller.getAllCategories.bind(this.controller)
    );
    router.get(
      "/categories/:categoryId",
      this.controller.getAllProductsByCategory.bind(this.controller)
    );
    router.get(
      "/category/:categoryId",
      this.controller.getOneCategory.bind(this.controller)
    );
    // router.post(
    //   "/",
    // this.jwtCheck,
    //   this.controller.insertOne.bind(this.controller)
    // );
    // router.post("/login", this.controller.login.bind(this.controller));
    router.get("/:productId", this.controller.getOne.bind(this.controller));
    // router.put(
    //   "/:listingId",
    //   // this.jwtCheck,
    //   this.controller.buyItem.bind(this.controller)
    // );
    return router;
  }
}

module.exports = ProductsRouter;
