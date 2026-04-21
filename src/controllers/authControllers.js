const clients = require("../model/userScheme");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 12;

const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.json({
        status: false,
        message: "all field are require",
      });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await clients.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      status: true,
      message: "user Signup sucessfully",
      user,
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
  bcrypt.compare(password, userFind.password, function (err, result) {
    if (result) {
      const token = jwt.sign(
        {
          email: userFind.email,
          username: userFind.username,
          id: userFind._id,
        },
        process.env.SECRET_KEY,
      );
      res.json({
        status: true,
        message: "user Found",
        token: token,
      });
    } else {
      res.json({
        status: false,
        message: "invalid cridential",
      });
    }
    // result == true
  });

  // if (userFind.password != password)
  //   return res.json({
  //     status: false,
  //     message: "Invalid Cridential",
  //   });
};

module.exports = { signupController, loginController };
