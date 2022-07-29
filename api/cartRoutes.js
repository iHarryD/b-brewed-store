const router = require("express").Router();
const users = require("../models/UserModel");
const verifyToken = require("../middlewares/tokenVerification");

router.get("/cart", verifyToken, async (req, res, next) => {
  try {
    const userData = await users.findById(req.user);
    res.send(userData.cart);
  } catch (err) {
    next(err);
  }
});

router.put("/cart/add", verifyToken, async (req, res, next) => {
  try {
    await users
      .findById(req.user, async (err, user) => {
        const itemInCart = user.cart.find(
          (product) => product.productID === req.body.productID
        );
        if (!itemInCart) {
          user.cart = [
            ...user.cart,
            { productID: req.body.productID, quantity: 1 },
          ];
        } else {
          const quantity = itemInCart.quantity;
          user.cart.map((product) => {
            if (product.productID !== req.body.productID) return;
            product.quantity = quantity + 1;
          });
        }
        const updatedUser = await user.save();
        res.send(updatedUser.cart);
      })
      .clone();
  } catch (err) {
    next(err);
  }
});

router.put("/cart/delete", verifyToken, async (req, res, next) => {
  const productID = req.body.productID;
  try {
    await users
      .findById(req.user, async (err, user) => {
        const itemInCart = user.cart.find(
          (product) => product.productID === productID
        );
        if (itemInCart) {
          user.cart = user.cart.filter((item) => item.productID !== productID);
        }
        const updatedUser = await user.save();
        res.send(updatedUser.cart);
      })
      .clone();
  } catch (err) {
    next(err);
  }
});

router.delete("/cart/delete-all", async (req, res) => {
  users.findByIdAndUpdate(
    req.user,
    { $pullAll: {} },
    { new: true },
    (err, doc) => {
      if (err)
        return res.status(500).send({ message: "Something went wrong." });
      res.status(200).send({ message: "Cart emptied.", data: doc });
    }
  );
});

module.exports = router;
