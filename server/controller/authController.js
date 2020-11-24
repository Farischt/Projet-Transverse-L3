const User = require("../model/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
// Helpers Validation
const {
  registerValidation,
  passwordValidation,
  loginValidation,
} = require("../helpers/authValidation.js");

//! REGISTER
module.exports.register = async (req, res) => {
  const { name, email, password, repeatedPassword } = req.body;

  // We first validate the user informations
  const { error } = registerValidation(req.body);
  if (error)
    return res.status(400).json({ errorMessage: error.details[0].message });

  // We check if passwords are the same
  const passwordCheck = passwordValidation(password, repeatedPassword);
  if (!passwordCheck)
    return res
      .status(400)
      .json({ errorMessage: "Passwords are not the same." });

  // We check if the user is or isn't in DB
  const mail = await User.findOne({ email: email });
  if (mail)
    return res.status(400).json({ errorMessage: "Email is already taken." });

  // We hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // We create the user then save him in DB
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.json({
      user: savedUser._id,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

//! LOGIN
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  // We first validate the user informations
  const { error } = loginValidation(req.body);
  if (error)
    return res.status(401).json({ errorMessage: error.details[0].message });

  // We check if the user is or isn't in DB
  const user = await User.findOne({ email: email });
  if (!user)
    return res.status(401).json({ errorMessage: "Email doesnt exist" });

  // We check if the password is correct
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ errorMessage: "Invalid password" });

  // We create a session using req.session
  req.session.userId = user._id;
  res.json({ user: req.session.userId });
};

//! LOGOUT
module.exports.logout = (req, res) => {
  req.session.userId = null;
  req.session.destroy();
  res.json({ message: "disconnected" });
};

//! CURRENT USER
module.exports.currentUser = async (req, res) => {
  if (typeof req.session.userId === "undefined") {
    return res.status(401).json({
      errorMessage: "You are not connected, please connect or register",
    });
  }
  const user = await User.findOne({ _id: req.session.userId });
  res.json({ userId: user._id, userName: user.name, userRole: user.role });
};

//! CHANGE PASSWORD
module.exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword, repeatPassword } = req.body;

  // We first check if the id is a mongoose.Types.ObjectId
  if (!ObjectId.isValid(req.session.userId))
    return res.status(400).send("user id is not valid");

  // We check if body passwords are the same
  const passwordCheck = passwordValidation(newPassword, repeatPassword);
  if (!passwordCheck)
    return res
      .status(400)
      .json({ errorMessage: "Passwords are not the same " });

  // Then we try to find the user in db
  const user = await User.findById(req.session.userId);
  if (!user) return res.status(404).json({ errorMessage: "User not found " });

  // We check if the password is correct
  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) return res.status(400).json({ errorMessage: "Invalid password" });

  // We hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Now we can update the password
  try {
    user.password = hashedPassword;
    await user.save();
    res.json({ message: "Password updated ! " });
  } catch (err) {
    return res.status(500).json({ errorMessage: err.message });
  }
};
