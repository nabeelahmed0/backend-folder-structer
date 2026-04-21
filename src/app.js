const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const connectDB = require("./config/db");
const authrouter = require("./Routes/authRoutes");
const userRoute = require("./Routes/userRoutes");

connectDB();
app.use(express.json());
// Authentication Route>>>>
// Login
// Signup
app.use("/api/auth", authrouter);

// USERS ROUTE
// Get User
// Update User
// Delete User
// FIND User
app.use("/api/users", userRoute);

app.listen(port, () => {
  console.log(`server is running on ${port} `);
});
