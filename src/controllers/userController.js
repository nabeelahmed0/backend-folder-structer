const jwt = require("jsonwebtoken");
const clients = require("../model/userScheme");

const userController = async (req, res) => {
  // const { verified, limit, pageNo } = req.query;
  // console.log(verified, limit, pageNo);

  res.json({
    status: true,
    message: "data Recieve",
    data: await clients.find(),
  });
};

const updateController = async (req, res) => {
  try {
    const updateDetail = req.body;

    const token = req.headers.authorization.split(" ")[1];

    var decoded = jwt.verify(token, process.env.SECRET_KEY);

    const dbUpdated = await clients.findByIdAndUpdate(decoded.id, updateDetail);
    res.json({
      status: true,
      message: "data updated",
      data: dbUpdated,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { userController, updateController };
