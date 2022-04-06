const router = require("express").Router();
const Products = require("../models/ProductsModel");

router.get("/all-products", async (req, res, next) => {
  try {
    const data = await Products.find();
    res.send(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
