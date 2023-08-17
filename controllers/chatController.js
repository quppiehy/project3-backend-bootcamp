const BaseController = require("./baseController");

class ChatController extends BaseController {
  constructor(model, messageModel, productModel, userModel, photoModel) {
    super(model);
    this.messageModel = messageModel;
    this.productModel = productModel;
    this.userModel = userModel;
    this.photoModel = photoModel;
  }

  /** if a method in this extended class AND the base class has the same name, the one in the extended class will run over the base method */

  async createRoom(data) {
    console.log(data);
    const { productId, userId } = data;
    try {
      const [newChat, created] = await this.model.findOrCreate({
        where: { productId: productId, userId: userId },
      });
      if (created) {
        console.log("Created 1 new Chat!");
      } else {
        console.log("retrieved chat!");
      }
      return newChat;
    } catch (err) {
      return err.message;
    }
  }

  async sendMessage(data) {
    const { content, room, userId } = data;
    try {
      const newChat = await this.messageModel.create({
        chatId: room,
        content: content,
        userId: userId,
      });
      return newChat;
    } catch (err) {
      return err.message;
    }
  }

  async getUserChatList(id) {
    try {
      const userChat = await this.model.findAll({
        where: { userId: id },
        // required: true,
        // duplicating: true,
        // as: "buying",
        include: [
          {
            model: this.productModel,
            // as: "productChat",
            include: [
              {
                model: this.userModel,
                // as: "seller",
                attributes: ["userName"],
              },
              {
                model: this.photoModel,
                // as: "photos",
                attributes: ["index", "url"],
              },
            ],
          },
        ],
      });
      console.log("Get userchatlist", userChat);
      return userChat;
    } catch (err) {
      return err.message;
    }
  }

  async getMessages(id) {
    try {
      const userChat = await this.messageModel.findAll({
        where: { chatId: id },
        include: [
          {
            model: this.userModel,
            as: "author",
            attributes: ["userName"],
          },
        ],
      });
      console.log("Giving user chat", userChat);
      return userChat;
    } catch (err) {
      return err.message;
    }
  }

  // // for seller
  async getSellerProductList(id) {
    console.log("In getSellerProductList");
    try {
      const userChat = await this.model.findAll({
        where: { sellerId: id },
        // as: "seller",
        include: [
          {
            model: this.productModel,
            // as: "productChat",
            include: [
              {
                model: this.userModel,
                // as: "productChat",
                attributes: ["userName"],
              },
              {
                model: this.photoModel,
                // as: "photos",
                attributes: ["index", "url"],
              },
            ],
          },
        ],
      });
      console.log("Giving from getsellerproducts: ", userChat);
      return userChat;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = ChatController;
