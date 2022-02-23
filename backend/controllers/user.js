const { body, validationResult } = require("express-validator");
const { login, createAuthToken } = require("../auth");
const config = require("../config");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.login = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  login(req, res, next);
};

exports.signup = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {
    const { firstName, username, password } = req.body;

    const user = await User.create({ firstName, username, password });

    res.status(201).json({ message: "Registered", user });
  } catch (err) {
    next(err);
  }
};

exports.loginValidate = (method) => {
  const errors = [
    body("username").exists().withMessage("Username is required"),
    body("password").exists().withMessage("Password is required"),
  ];

  return errors;
};
exports.singUpValidate = (method) => {
  const errors = [
    body("firstName").exists().withMessage("First Name is required"),

    body("username").exists().withMessage("Username is required"),
    body("password").exists().withMessage("Password is required"),
  ];

  if (method === "register") {
    errors.push(
      body("username").custom(async (phone) => {
        const exists = await User.countDocuments({ phone });
        if (exists) throw new Error("already exists");
      })
    );
  }

  return errors;
};
