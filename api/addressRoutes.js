const router = require("express").Router();
const users = require("../models/UserModel");
const addresses = require("../models/AddressModel");
const verifyToken = require("../middlewares/tokenVerification");
const addressJoiValidation = require("../validations/addressJoiValidation");

router.get("/addresses", verifyToken, async (req, res, next) => {
  try {
    const userData = await users.findById(req.user);
    if (!userData) return res.status(404).send({ message: "User not found." });
    const userAddresses = await addresses.find({ belongsTo: userData._id });
    res.send(userAddresses);
  } catch (err) {
    next(err);
  }
});

router.post("/addresses", verifyToken, async (req, res, next) => {
  try {
    const joiValidation = addressJoiValidation(req.body);
    const { error } = joiValidation;
    if (error)
      return res.status(500).send({ message: error.details[0].message });
    const newAddress = await new addresses({
      ...req.body,
      belongsTo: req.user,
    });
    await newAddress.save();
    res
      .status(200)
      .send({ message: "Address successfully added.", data: newAddress });
  } catch (err) {
    next(err);
  }
});

router.delete("/addresses", verifyToken, async (req, res, next) => {
  try {
    await users
      .findById(req.user, async (err, user) => {
        if (user.wishlist.includes(req.body.productID)) {
          user.wishlist = user.wishlist.filter(
            (item) => item !== req.body.productID
          );
        }
        const updatedUser = await user.save();
        res.send(updatedUser.wishlist);
      })
      .clone();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
