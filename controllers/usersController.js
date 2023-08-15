const BaseController = require("./baseController");

class UsersController extends BaseController {
  constructor(model, address) {
    super(model);
    this.addressModel = address;
  }

  /** if a method in this extended class AND the base class has the same name, the one in the extended class will run over the base method */

  // onLogin check if user exists, if not create
  async login(req, res) {
    const user = req.body;
    console.log("this is the user", user);
    let givenName = "";
    let familyName = "";
    let loginEmail = "";
    if (user.given_name !== "" && user.family_name !== "") {
      const { given_name, family_name, email } = req.body;
      givenName = given_name;
      familyName = family_name;
      loginEmail = email;
      console.log(givenName, familyName, email);
    } else {
      const { email } = req.body;
      givenName = null;
      familyName = null;
      loginEmail = email;
      console.log(givenName, familyName, email);
    }
    try {
      console.log("I'm in login try: b4 findone");
      const [checkedUser, created] = await this.model.findOrCreate({
        where: { email: loginEmail },
        defaults: {
          firstName: givenName,
          lastName: familyName,
          phoneNum: null,
          email: loginEmail,
          userName: loginEmail,
        },
      });

      if (created) {
        console.log("User Created!");
      } else {
        console.log("User retrieved!");
      }

      return res.json({ checkedUser });
    } catch (err) {
      console.log(err.message);

      console.log("I'm in login catch-try-catch: error");
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

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
  async getOne(req, res) {
    const { userId } = req.params;

    try {
      const output = await this.model.findByPk(userId);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // async getAll(req, res) {
  //   // console.log(this.userModel);
  //   try {
  //     const output = await this.model.findAll();
  //     return res.json(output);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // }

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

  // Example implementation in your UsersController.js
  // UsersController.js

  // ... your other methods ...

  // Example implementation in your UsersController.js

  async updateUserInfo(req, res) {
    const { userName, firstName, lastName, email, mobileNumber, id } = req.body;
    try {
      const updatedUser = await this.model.update(
        { userName, firstName, lastName, email, mobileNumber },
        { where: { id: id } }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.error(err.message);
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async getOneAddress(req, res) {
    const { userId } = req.params;
    try {
      const existingAddress = await this.addressModel.findOne({
        where: { userId: userId },
      });
      return res.json(existingAddress);
    } catch (error) {
      console.error("Error processing the address:", error);
      return res.status(500).json({ error: true, msg: "Error" });
    }
  }

  async findOrCreateAddress(req, res) {
    const { userId } = req.params;
    const { address, city, postalCode, contactNumber } = req.body;

    try {
      // Check if an address for the user already exists
      const existingAddress = await this.addressModel.findOne({
        where: { userId: userId },
      });

      if (existingAddress) {
        // Update the address if it exists
        await existingAddress.update({
          address,
          city,
          postalCode,
          contactNumber,
        });
        console.log(`Address updated for user: ${userId}`);
      } else {
        // Create a new address if it doesn't exist
        await this.addressModel.create({
          userId,
          address,
          city,
          postalCode,
          contactNumber,
        });
        console.log(`Address created for user: ${userId}`);
      }

      return res.json({
        success: true,
        message: "Address processed successfully",
      });
    } catch (error) {
      console.error("Error processing the address:", error);
      return res.status(500).json({ error: true, msg: "Error" });
    }
  }

  async updateAddressInfo(req, res) {
    const { address, city, postalCode, addressMobileNumber, userId } = req.body;

    try {
      const updatedAddress = await this.addressModel.updateForUser(userId, {
        address,
        city,
        postalCode,
        addressMobileNumber,
      });

      return res.json(updatedAddress);
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .json({ error: true, msg: "Address update failed" });
    }
  }
}

module.exports = UsersController;
