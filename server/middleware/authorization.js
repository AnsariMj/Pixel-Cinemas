const jwt = require("jsonwebtoken");
const User = require("./../models/user");
const { promisify } = require("util");

const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({
      message: "Please Login",
    });
  }
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
    const doesUserExist = await User.findOne({ _id: decoded.id });
    if (!doesUserExist) {
      return res.status(404).json({
        message: "User does not exist with that token/id",
      });
    }

    req.user = doesUserExist;
    next();
  } catch (error) {
    // Fix the typo here
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "You do not have permission to access this page",
    });
  }
};

module.exports = {
  isAuthenticated,
  isAdmin
};
