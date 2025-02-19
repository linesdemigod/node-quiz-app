const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()[0].msg });
  }

  const emailExists = await User.findOne({
    where: {
      email: email,
    },
  });
  if (emailExists) {
    return res.status(400).json({ msg: "Email already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  return res.status(200).json({ message: "user registered", user: user });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({ errors: error.array()[0].msg });
  }
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10h",
      }
    );
    res.status(200).json({ message: "Login Successful", token: accessToken });
  } else {
    return res.status(401).json({ msg: "Invalid email or password" });
  }
});

module.exports = {
  login,
  register,
};
