const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  loginJoiValidation,
  signupJoiValidation,
} = require("../validations/authJoiValidation");
const users = require("../models/UserModel");

router.post("/login", async (req, res, next) => {
  const wrongCredentialsMessage = "Invalid email or password.";
  const { error } = loginJoiValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const userData = await users.findOne({ email: req.body.email });
    if (!userData) return res.status(401).send(wrongCredentialsMessage);
    const matchPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!matchPassword) return res.status(401).send(wrongCredentialsMessage);
    const token = jwt.sign({ user: userData._id }, process.env.JWT_SECRET);
    res.header("auth-token", token).status(200).send({
      message: "Successfully logged in!",
      token,
      firstName: userData.firstName,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  const { error } = signupJoiValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const userData = await users.findOne({ email: req.body.email });
    if (userData) return res.status(403).send("User already registered.");
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new users({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: encryptedPassword,
    });
    await newUser.save();
    res.status(200).send({ message: "Successfully registered." });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
