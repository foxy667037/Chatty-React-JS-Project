import express from "express";
import multer from "multer";
import checkUserAuthentication from "../middlewares/auth.middleware.js";
import {
  getUsersController,
  getMessageController,
  sendMessageController,
} from "../controllers/message.controller.js";

const router = express.Router();

// multer-config
const storage = multer.diskStorage({});
const upload = multer({ storage });

// routes
router.get("/users", checkUserAuthentication, getUsersController);
router.get("/:id", checkUserAuthentication, getMessageController);
router.get(
  "/send/:id",
  checkUserAuthentication,
  upload.single("file"),
  sendMessageController
);

export default router;
