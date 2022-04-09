const { date } = require("@hapi/joi/lib/template");
const mongoose = require("mongoose");

const User = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  wishlist: {
    type: Array,
  },
  cart: {
    type: Array,
  },
  createdAt: {
    type: date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", User);
