const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { Op } = require("sequelize");
const { check, validationResult } = require("express-validator");

const register = async (req, res) => {
  try {
    await check("email", "Please enter a valid email").isEmail().run(req);
    await check("username", "Please enter a valid username")
      .trim()
      .isLength({ min: 6 })
      .run(req);
    await check("password", "Please enter a password with 6 or more characters")
      .trim()
      .isLength({ min: 6 })
      .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({
        errors: errors.array(),
        status: false,
        message: errors
          .array()
          .map((error) => error.msg)
          .toString(),
      });
    }

    const { email, username, password } = req.body;

    let user = await User.findOne({ where: { email } });

    if (user) {
      return res.json({ message: "user already exist", status: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({ email, username, password: hashedPassword });

    const token = JWT.sign({ user: { id: user.id } }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ token, status: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to register user", error: error, status: true });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({
      where: {
        [Op.or]: [{ email: username }, { username: username }],
      },
    });

    if (!user) {
      return res.json({
        message: "Invalid credentials, user doesn't exist",
        status: false,
      });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ message: "Invalid credentials", status: false });
    }

    const token = JWT.sign({ user: { id: user.id } }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ token, status: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to log in", error: error, status: true });
  }
};

const getAll = async (req, res) => {
  // Verify admin authorization here if needed

  try {
    const users = await User.findAll();

    res.status(200).json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch all users", error: error.message });
  }
};

module.exports = { register, login, getAll };
