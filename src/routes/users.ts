import express = require("express");
import mongoose from "mongoose";
import UserSchema from "../db/user";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { IUser } from "../interfaces"
require("dotenv").config();

const User = mongoose.model<IUser>("User", UserSchema);
const users = express.Router();

const jwtToken = process.env.TOKEN;

interface User {
  name: number;
  email: string;
  gibberish: string;
}

users.post("/register", async (req, res) => {
  const User = mongoose.model("User", UserSchema);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const salt = await bcrypt.genSalt(10);
    if (!salt) console.error("error with bcrypt");
    const hash = await bcrypt.hash(password, salt);
    if (!hash) console.error("error hashing pass");
    const user: any = new User({ name, email, password: hash });
    user.save((err: any, user: any) => {
      if (err) {
        console.error("save error:", err);
        return res.status(500).send(err);
      } else {
        const token = jwt.sign({ id: user._id }, jwtToken, { expiresIn: 3600 });
        res.status(200).json({
          token,
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
          },
        });
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

  //TODO: register user when posting users
  //res.send("posted /users");
});

users.post("/login", async (req, res) => {
  const User = mongoose.model("User", UserSchema);
  const { email, password } = req.body;
  try {
    const user: any = await User.findOne({ email });
    if (!user) res.status(400).json({ error: "User already exists" });
    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, jwtToken, { expiresIn: 3600 });
    if (!token) console.error("Error signing token");
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

git add

module.exports = users;
