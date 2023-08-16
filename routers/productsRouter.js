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
    router.post("/", this.controller.postProduct.bind(this.controller));

    //Cart Functions

    router.get(
      "/carts/:userId",
      this.controller.getOrCreateCart.bind(this.controller)
    );
    router.post("/carts/", this.controller.addToCart.bind(this.controller));

    router.get(
      "/cart/:userId",
      this.controller.getAllProductsFromCart.bind(this.controller)
    );

    router.put(
      "/cart/:currentCartId",
      this.controller.updateCurrentCart.bind(this.controller)
    );
    router.put(
      "/cart/:currentCartId/total",
      this.controller.updateTotalOfCurrentCart.bind(this.controller)
    );

    router.delete(
      "/cart/:currentCartId/:productId",
      this.controller.destroyProductFromCart.bind(this.controller)
    );

    router.put(
      "/cart/:userId/update",
      this.controller.clearAndEmptyCart.bind(this.controller)
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
