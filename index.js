const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const productRoutes = require("./api/productRoutes");
const server = express();
const errorHandler = require("./middlewares/errorHandler");

mongoose.connect(process.env.DB_PASSKEY, () => console.log("Connected to DB"));

// MIDDLEWARES
server.use(cors());
server.use(express.json());
server.use("/api", productRoutes);
server.use(errorHandler);
server.use((req, res, next) => {
  const err = new Error("Not found!");
  res.status(404);
  res.send({ message: err });
});

server.listen(process.env.PORT || 3001);
