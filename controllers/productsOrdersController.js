const BaseController = require("./baseController");

class ProductsOrdersController extends BaseController {
  constructor(model, productOrderModel, productModel, sellerDiscountModel) {
    super(model);
    this.productOrderModel = productOrderModel;
    this.productModel = productModel;
    this.sellerDiscountModel = sellerDiscountModel;
  }
  async getAll(req, res) {
    //const { orderId } = req.params;
    try {
      const output = await this.model.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
  async getOne(req, res) {
    const { orderId } = req.params;
    try {
      const output = await this.model.findAll({
        where: { orderId: orderId },
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = ProductsOrdersController;

// //async getAll(req, res) {
//   //  const { orderId } = req.params;
//     //try {
//       /const output = await this.model.findAll({
//         where: { orderId: orderId },
//         include: [
//           { model: this.orderModel },
//           { model: this.productModel },
//           //{ model: this.//sellerDiscountModel },
//         ],
//       });
