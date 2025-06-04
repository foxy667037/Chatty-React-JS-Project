import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "./utils/logs.util.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { rateLimiter } from "./middlewares/rateLimiter.middleware.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// use winston for logs:
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// default route for check server is working or not:
app.get("/", (req, res) => {
  res.status(200).send({ msg: "Server is running." });
});

// auth route
app.use("/api/auth", authRoutes);

// message route
app.use("/api/message", messageRoutes);

export default app;
