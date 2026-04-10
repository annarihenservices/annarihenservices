const User = require("../models/user.models.js");
const { throwError } = require("../utils/error.js");
const bcrypt = require("bcrypt");

//===== Get User =====//
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(throwError(404, "User not found"));

    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

//======= Update User =======//
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(throwError(404, "User not found"));

    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

//===== Delete User =====//
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(throwError(404, "User not found"));

    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");

    res.status(200).json("User deleted successfully!");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};