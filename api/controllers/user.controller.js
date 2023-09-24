import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(403, "You do not have rights to update this profile"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture
        }
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const deleteAccount = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(403, "Yo do not have rights to delete this account"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json("Account deleted successfully");
  } catch (error) {
    next(error);
    console.log(error);
  }
};
