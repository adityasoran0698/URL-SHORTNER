const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

function setUser(user) {
  return jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    secret
  );
}

function getUser(token) {
  if (!token) return null;

  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
