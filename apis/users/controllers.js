const Users = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");

const generateToken = (user) => {
  const payload = {
    username: user.username,
    _id: user._id,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

exports.signup = async (req, res, next) => {
  try {
    const password = req.body.password;
    const saltRounds = 10;
    req.body.password = await bcrypt.hash(password, saltRounds);
    const newUser = await Users.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ msg: "Created", payload: token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    res.status(201).json({ msg: "Created", payload: token });
  } catch (error) {
    next(error);
  }
};
