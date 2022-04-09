const router = require("express").Router();
const users = require("../models/UserModel");
const verifyToken = require("../middlewares/tokenVerification");

router.get("/wishlist", verifyToken, async (req, res, next) => {
  try {
    const userData = await users.findById(req.user);
    res.send(userData.wishlist);
  } catch (err) {
    next(err);
  }
});

router.put("/wishlist/add", verifyToken, async (req, res, next) => {
  try {
    await users
      .findById(req.user, async (err, user) => {
        if (!user.wishlist.includes(req.body.productID)) {
          user.wishlist = [...user.wishlist, req.body.productID];
        }
        const updatedUser = await user.save();
        res.send(updatedUser.wishlist);
      })
      .clone();
  } catch (err) {
    next(err);
  }
});

router.put("/wishlist/delete", verifyToken, async (req, res, next) => {
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
