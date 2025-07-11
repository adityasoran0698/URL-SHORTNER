const { getUser } = require("../service/Auth");
async function restrictToLoggedinUserOnly(req, res, next) {
  const usertoken = req.cookies?.token;
  if (!usertoken) {
    return res.redirect("/login");
  }
  const user = getUser(usertoken);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  next();
}

function checkAuth(req, res, next) {
  const usertoken = req.cookies?.token;
  const user = getUser(usertoken);
  req.user = user;
  next();
}
module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
