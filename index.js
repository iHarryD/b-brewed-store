const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const productRoutes = require("./api/productRoutes");
const authRoutes = require("./api/authRoutes");
const wishlistRoutes = require("./api/wishlistRoutes");
const cartRoutes = require("./api/cartRoutes");
const addressRoutes = require("./api/addressRoutes");
const paymentRoutes = require("./api/paymentRoutes");
const server = express();
const errorHandler = require("./middlewares/errorHandler");

mongoose.connect(process.env.DB_PASSKEY, () => console.log("Connected to DB"));

// MIDDLEWARES
server.use(cors());
server.use(express.json());
server.use("/api", productRoutes);
server.use("/api/auth", authRoutes);
server.use("/api", wishlistRoutes);
server.use("/api", cartRoutes);
server.use("/api", addressRoutes);
server.use("/api", paymentRoutes);
server.use(errorHandler);
server.use((req, res, next) => {
  const err = new Error("Not found!");
  res.status(404);
  res.send({ message: err });
});

server.listen(process.env.PORT || 3001);
