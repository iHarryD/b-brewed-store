const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
  contactName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  alternatePhoneNumber: {
    type: String,
    required: false,
  },
  firstLineAddress: {
    type: String,
    required: true,
  },
  lastLineAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  belongsTo: {
    type: String,
    required: true,
  },
  isPreferred: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("addresses", AddressSchema);
