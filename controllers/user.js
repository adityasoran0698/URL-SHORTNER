const User = require("../models/user.js");
const { setUser, getUser } = require("../service/Auth");
const UserSignup = async (req, res) => {
  const body = req.body;
  try {
    const user = await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("signup", {
      error: "User Already Exists!",
    });
  }
};
const UserLogin = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({
      email: body.email,
      password: body.password,
    });

    const token = setUser(user);
    res.cookie("token", token);
    return res.redirect("/");
  } catch (error) {
    return res.render("login", {
      error: "Incorrect email or password",
    });
  }
};
module.exports = {
  UserSignup,
  UserLogin,
};
