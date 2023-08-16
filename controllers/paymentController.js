const BaseController = require("./baseController");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

class PaymentController extends BaseController {
  constructor(model) {
    super(model);
  }

  async Pay(req, res) {
    let { amount, id } = req.body;
    try {
      const payment = await stripe.paymentIntents.create({
        amount: amount,
        currency: "SGD",
        description: "SAJA NONLIMITED",
        payment_method: id,
        confirm: true,
      });
      console.log(payment);
      res.json({
        message: "Payment Success",
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: "Payment Fail",
        success: false,
      });
    }
  }
}

module.exports = PaymentController;
