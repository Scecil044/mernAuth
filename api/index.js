import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { connectDb } from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";

dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Mongo connected`.cyan.underline);
  })
  .catch(error => {
    console.log(error);
  });
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`.cyan.underline);
});
