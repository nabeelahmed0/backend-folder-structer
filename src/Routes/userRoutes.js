const express = require("express");
const {
  userController,
  updateController,
} = require("../controllers/userController");

const userRoute = express.Router();

userRoute.get("/", userController);
userRoute.put("/", updateController);

module.exports = userRoute;
