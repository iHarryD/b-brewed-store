const mongoose = require("mongoose");

const Product = mongoose.Schema({
  name: String,
  brand: String,
  productQuantity: String,
  price: Number,
  sku: Array,
  color: String,
  material: String,
  productCapacity: String,
  rating: Number,
});

module.exports = mongoose.model("products", Product);
