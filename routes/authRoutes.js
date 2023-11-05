import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

//register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
  });

  const salt = bcrypt.genSaltSync(12);
  const passwordHash = bcrypt.hashSync(req.body.password, salt);

  newUser.password = passwordHash;

  try {
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ msg: "El usuario no existe" });

    //validar el password
    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isCorrectPassword)
      return res.status(401).json({ msg: "El password no es valido" });

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      {
        expiresIn: "5d",
      }
    );

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
