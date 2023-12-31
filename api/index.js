import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Mongo connected`.cyan.underline);
  })
  .catch(error => {
    console.log(error);
  });

const __dirname = path.resolve();
const app = express();

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(express.json());
app.use(cookieParser());

const port = 4000;

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json("welcome back");
});
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
