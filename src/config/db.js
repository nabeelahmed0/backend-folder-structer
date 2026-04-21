const e = require("express");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongCon = await mongoose.connect(process.env.MONGO_URI);
    console.log(`"DB connect${mongCon.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
