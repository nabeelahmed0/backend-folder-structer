const mongoose = require("mongoose");

const UserScheme = mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
    unique: true,
  },
});

const clients = mongoose.model("client", UserScheme);

module.exports = clients;
