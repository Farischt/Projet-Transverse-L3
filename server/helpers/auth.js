const User = require("../model/User");
const mongoose = require("mongoose");

module.exports.verifyConnection = (req, res, next) => {
  if (req.session.userId)
    return res.status(401).send("You are already connected");
  next();
};

module.exports.verifyAuth = (req, res, next) => {
  if (!req.session.userId) return res.status(401).send("Acces Denied");
  next();
};

module.exports.verifyAdmin = async (req, res, next) => {
  const { userId } = req.session;
  const adminUser = await User.findOne({ _id: userId });
  if (adminUser.role != "admin")
    return res
      .status(401)
      .json({ errorMessage: "Acces denied, admin ressources" });
  else next();
};
