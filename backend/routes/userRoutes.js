import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

import UserModel from "../mongoDB/models/user.js";
import createSecrectToken from "../utils/SecretToken.js";

dotenv.config();

const router = express.Router();

router.post("/sign-up", async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUsernameExisted = await UserModel.findOne({ username });
    if (isUsernameExisted) {
      return res.status(409).json({
        success: false,
        message: "Username Existed!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Sign Up Successfully!",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }
});

router.post("/sign-in", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({ success: false, message: "All fields are required!" });
    }
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.json({ success: false, message: "User Invalid!" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ success: false, message: "Incorrect password!" });
    }
    const token = createSecrectToken(user._id);
    res.cookie("token", token, { withCredentials: true, httpOnly: false });
    res.status(201).json({ success: true, message: "Sign In Successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Some thing went wrong!" });
  }
});

router.post("/", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await UserModel.findById(data.id);
      if (user) {
        return res.json({ status: true, user });
      } else {
        return res.json({ status: false });
      }
    }
  });
});

export default router;
