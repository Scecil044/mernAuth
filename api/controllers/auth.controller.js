import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { email, userName, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({ userName, email, password: hashedPassword });
    user.password = undefined;
    res.status(200).json({
      user
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "Invalid credentials"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(403, "Invalid credentials"));
    //set Expiry date
    const expiryDate = new Date(Date.now() + 3600000);
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_sECRET);
    validUser.password = undefined;
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(validUser);
  } catch (error) {
    next(error);
  }
};
