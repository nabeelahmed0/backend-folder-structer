const clients = require("../model/userScheme");
const jwt = require("jsonwebtoken");

const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.json({
        status: false,
        message: "all field are require",
      });
    }
    await clients.create({ username, email, password });
    return res.status(200).json({
      status: true,
      message: "user Signup sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "false",
      message: error.message,
    });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const userFind = await clients.findOne({
    email: email,
  });
  if (!userFind)
    return res.json({
      status: false,
      message: "no user found",
    });
  const token = jwt.sign({
    email : userFind.email,
    username : userFind.username,
    id : userFind._id
  }, process.env.SECRET_KEY);

  if (userFind.password != password)
    return res.json({
      status: false,
      message: "Invalid Cridential",
    });
  res.json({
    status: true,
    message: "user Found",
    token: token,
  });
};

module.exports = { signupController, loginController };
