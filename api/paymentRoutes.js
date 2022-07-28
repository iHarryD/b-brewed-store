const router = require("express").Router();
const Razorpay = require("razorpay");
const verifyToken = require("../middlewares/tokenVerification");
const users = require("../models/UserModel");
const products = require("../models/ProductsModel");
const uniqueId = require("lodash.uniqueid");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/payments", verifyToken, async (req, res) => {
  try {
    const user = await users.findById(req.user);
    const userCart = user.cart.map((item) => item.productID);
    const cartProducts = await products.find({ _id: { $in: userCart } });
    const cartTotal = cartProducts.reduce((total, currentProduct) => {
      const productPrice =
        currentProduct.sku.length > 0
          ? currentProduct.sku[0].price
          : currentProduct.price;
      return productPrice + total;
    }, 0);
    const order = await instance.orders.create({
      amount: (cartTotal * 100).toString(),
      currency: "INR",
      payment_capture: 1,
      receipt: uniqueId("payment-receipt-"),
    });
    return res.status(200).send({
      message: "Payment created.",
      data: {
        amount: order.amount,
        currency: order.currency,
        email: user.email,
        name: user.firstName,
        id: order.id,
      },
    });
  } catch (err) {
    res.status(500).send({ message: "Something went wrong.", data: err });
  }
});

module.exports = router;
