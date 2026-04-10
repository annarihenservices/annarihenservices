const bcrypt = require("bcrypt");
const User = require("../models/user.models.js");
const { throwError } = require("../utils/error.js");

//====== handle signup route ===========//
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ======== sign in route handling =====//
const signin = async (req, res, next) => {
  const { email, userPassword } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(throwError(404, "Wrong Credentials!"));

    const isValidPassword = bcrypt.compareSync(
      userPassword,
      validUser.password
    );

    if (!isValidPassword)
      return next(throwError(401, "Wrong Credentials!"));

    const { password, ...rest } = validUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//===== handle signout =====//
const signOut = async (req, res, next) => {
  try {
    res.status(200).json("User logged out successfully!");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
  signOut,
};