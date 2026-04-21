const express = require("express");
const clients = require("../model/userScheme");
const {
  signupController,
  loginController,
} = require("../controllers/authControllers");


const authrouter = express.Router();

// signup API
authrouter.post("/signup", signupController);
// Login API
authrouter.post("/login", loginController);

module.exports = authrouter;
