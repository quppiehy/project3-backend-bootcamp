const BaseController = require("./baseController");

class ProductsController extends BaseController {
  constructor(model, category, seller_discount, user, photo) {
    super(model);
    this.categoryModel = category;
    this.sellerDiscountModel = seller_discount;
    this.userModel = user;
    this.photoModel = photo;
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
            as: "seller",
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
          { model: this.userModel, as: "seller" }, // Using the alias defined in the association
          { model: this.categoryModel },
          { model: this.sellerDiscountModel },
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
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}
module.exports = ProductsController;
