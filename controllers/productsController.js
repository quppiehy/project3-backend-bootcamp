const BaseController = require("./baseController");
const { Op } = require("sequelize");

class ProductsController extends BaseController {
  constructor(
    model,
    category,
    seller_discount,
    user,
    photo,
    current_cart,
    current_cart_product,
    review
  ) {
    super(model);
    this.categoryModel = category;
    this.sellerDiscountModel = seller_discount;
    this.userModel = user;
    this.photoModel = photo;
    this.currentCartModel = current_cart;
    this.currentCartProductModel = current_cart_product;
    this.reviewModel = review;
  }

  // onLogin check if user exists, if not create
  // async login(req, res) {
  //   const user = req.body;
  //   console.log(user);
  //   const { given_name, family_name, email } = req.body;
  //   const givenName = given_name;
  //   const familyName = family_name;
  //   console.log(givenName, familyName);
  //   try {
  //     console.log("I'm in login try: b4 findone");
  //     const [checkedUser, created] = await this.userModel.findOrCreate({
  //       where: { email: email },
  //       defaults: {
  //         firstName: givenName,
  //         lastName: familyName,
  //         phoneNum: null,
  //         email: email,
  //       },
  //     });

  //     if (created) {
  //       console.log("User Created!");
  //     }

  //     return res.json({ checkedUser });
  //   } catch (err) {
  //     console.log(err.message);

  //     console.log("I'm in login catch-try-catch: error");
  //     return res.status(400).json({ error: true, msg: err.message });
  //   }
  // }

  // Create listing. Requires authentication.
  // async insertOne(req, res) {
  //   console.log(req.body.title);
  //   console.log(req.body.currUser.id);
  //   const {
  //     title,
  //     category,
  //     condition,
  //     price,
  //     description,
  //     shippingDetails,
  //     currUser,
  //   } = req.body;
  //   console.log(currUser);
  //   const { id } = currUser;
  //   try {
  //     // TODO: Get seller email from auth, query Users table for seller ID
  //     // already retrieved user from Login function above

  //     // Create new listing
  //     const newListing = await this.model.create({
  //       title: title,
  //       category: category,
  //       condition: condition,
  //       price: price,
  //       description: description,
  //       shippingDetails: shippingDetails,
  //       buyerId: null,
  //       sellerId: id, // TODO: Replace with seller ID of authenticated seller
  //     });

  //     // Respond with new listing
  //     return res.json(newListing);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // }

  // Retrieve specific listing. No authentication required.

  // Buy specific listing. Requires authentication.
  // async buyItem(req, res) {
  //   const { listingId } = req.params;
  //   const currUser = req.body;
  //   try {
  //     const data = await this.model.findByPk(listingId);

  //     // TODO: Get buyer email from auth, query Users table for buyer ID
  //     await data.update({ buyerId: currUser.id }); // TODO: Replace with buyer ID of authenticated buyer

  //     // Respond to acknowledge update
  //     return res.json(data);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // }

  async getOne(req, res) {
    const { productId } = req.params;
    try {
      const output = await this.model.findByPk(productId, {
        include: [
          { model: this.photoModel },
          {
            model: this.userModel,
          },
        ],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //get all products with the category, seller info (user), and seller discount info
  async getAllProducts(req, res) {
    try {
      const output = await this.model.findAll({
        include: [
          { model: this.userModel }, // Using the alias defined in the association
          { model: this.categoryModel },
          { model: this.sellerDiscountModel },
          { model: this.photoModel },
        ],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  //get all categories
  async getAllCategories(req, res) {
    try {
      const output = await this.categoryModel.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  //get info from one category
  async getOneCategory(req, res) {
    const { categoryId } = req.params;
    try {
      const output = await this.categoryModel.findByPk(categoryId);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  //get all products by category
  async getAllProductsByCategory(req, res) {
    const categoryId = req.params.categoryId;
    try {
      const output = await this.model.findAll({
        where: { categoryId },
        include: [{ model: this.photoModel }],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async getProductsByFiltering(req, res) {
    const search = req.body.search; // Extract the title value from the request body
    try {
      const output = await this.model.findAll({
        where: {
          title: {
            [Op.iLike]: `%${search}%`, // Use wildcards to match titles that contain the specified string
          }, // Search for products with the given title
        },
        include: [{ model: this.photoModel }],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  //Product Cart functionalities
  async getOrCreateCart(req, res) {
    try {
      const { userId } = req.params;
      const [cart, created] = await this.currentCartModel.findOrCreate({
        where: { userId },
        defaults: { userId },
      });
      if (created) {
        console.log("cart already created");
      }
      res.json(cart.id);
    } catch (error) {
      console.error("Error", error);
      res.status(500).json({ error: "Failed" });
    }
  }

  async addToCart(req, res) {
    try {
      const { productId, currentCartId, quantity } = req.body;
      await this.currentCartProductModel.create({
        productId: productId,
        currentCartId: currentCartId,
        quantity: quantity,
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error", error);
      res.status(500).json({ error: "Failed" });
    }
  }

  async updateCurrentCart(req, res) {
    try {
      const { currentCartId } = req.params;
      const { productId, quantity } = req.body;
      const updatedProduct = await this.currentCartProductModel.update(
        { quantity: quantity },
        {
          where: {
            currentCartId: currentCartId,
            productId: productId,
          },
        }
      );
      res.json(updatedProduct);
    } catch (error) {
      console.error("Error", error);
      res.status(500).json({ error: "Failed" });
    }
  }

  async updateTotalOfCurrentCart(req, res) {
    try {
      const { currentCartId } = req.params;
      const { total } = req.body;

      const updatedCart = await this.currentCartModel.update(
        { totalPrice: total },
        {
          where: {
            id: currentCartId,
          },
        }
      );
      res.json(updatedCart);
    } catch (error) {
      console.error("Error", error);
      res.status(500).json({ error: "Failed" });
    }
  }

  async destroyProductFromCart(req, res) {
    try {
      const { currentCartId, productId } = req.params;
      await this.currentCartProductModel.destroy({
        where: {
          currentCartId: currentCartId,
          productId: productId,
        },
      });
      res.status(200).json({ message: "Product deleted from cart" });
    } catch (error) {
      console.error("Error", error);
      res.status(500).json({ error: "Failed" });
    }
  }

  async getAllProductsFromCart(req, res) {
    try {
      const { userId } = req.params;

      const cart = await this.currentCartModel.findOne({
        where: { userId: userId },
      });

      const productsInCart = await this.currentCartProductModel.findAll({
        where: { currentCartId: cart.id },
        include: [
          {
            model: this.model,
            include: [
              { model: this.photoModel },
              { model: this.sellerDiscountModel },
            ],
          },
        ],
        order: [["id", "ASC"]],
      });

      if (!cart) {
        res.json(null);
      } else {
        res.json(productsInCart);
      }
    } catch (error) {
      console.error("Error", error);
      res.status(500).json({ error: "Failed" });
    }
  }
  // adds a product onto the table
  async postProduct(req, res) {
    console.log(req.body);
    try {
      const {
        sellerId,
        sellerDiscountId,
        title,
        price,
        description,
        categoryId,
        quantity,
        photos,
      } = req.body;
      const postedProduct = await this.model.create({
        sellerId: sellerId,
        sellerDiscountId: sellerDiscountId,
        title: title,
        price: price,
        description: description,
        categoryId: categoryId,
        quantity: quantity,
      });
      console.log(postedProduct);
      const photoPromise = photos.map(async (photoUrl, index) => {
        const sentPhoto = await this.photoModel.create({
          index: index,
          url: photoUrl,
          productId: postedProduct.id,
        });
        return sentPhoto;
      });
      const createdPhotosLinks = await Promise.all(photoPromise);
      postedProduct.setDataValue("photos", createdPhotosLinks);
      res.json(postedProduct);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  async addOneReview(req, res) {
    const { productId } = req.params;
    const { userId, content, ratingId } = req.body;
    try {
      const output = await this.reviewModel.create({
        productId: productId,
        userId: userId,
        content: content,
        ratingId: ratingId,
      });
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
  async getAllReviewForProduct(req, res) {
    const { productId } = req.params;
    try {
      const output = await this.reviewModel.findAll({
        where: { productId: productId },
        include: [{ model: this.userModel }],
      });
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async getTotalPrice(req, res) {
    const { userId } = req.params;
    try {
      const total = await this.currentCartModel.findAll({
        where: {
          userId: userId,
        },
      });
      console.log(total);
      res.json(total);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  async clearAndEmptyCart(req, res) {
    const { userId } = req.params;
    try {
      // set total cart to 0
      await this.currentCartModel.update(
        { totalPrice: 0 },
        { where: { userId } }
      );
      // find the cart based on userId
      const cart = await this.currentCartModel.findOne({
        where: { userId },
      });
      // delete all products from cart
      if (cart) {
        await this.currentCartProductModel.destroy({
          where: { currentCartId: cart.id },
        });
      }
      res.json({
        success: true,
        message: "Cleared",
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "error failed to clear cart" });
    }
  }
}
module.exports = ProductsController;
