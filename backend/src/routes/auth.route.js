import express from "express";
import {
  createUserController,
  loginUserController,
  logoutUserController,
  updateUserController,
  updateUserPrivacyController,
  deleteUserController,
  checkUserController,
  getAllUserController,
  getAllActivities,
} from "../controllers/auth.controller.js";
import {
  validateCreateUser,
  validateLoginUser,
  validateUpdateUser,
} from "../validators/auth.validator.js";
// import { } from "../middlewares/middleware.js";
import checkUserAuthentication from "../middlewares/auth.middleware.js";
// import } from "../middlewaremiddleware.js";
import validatorResult from "../middlewares/validatorResult.middleware.js";
import multer from "multer";

const router = express.Router();

// multer-config
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// routes
router.post(
  "/signup",
  
  upload.single("file"),
  validateCreateUser,
  validatorResult,
  createUserController
);
router.post(
  "/login",
  
  validateLoginUser,
  validatorResult,
  loginUserController
);
router.use("/logout",  checkUserAuthentication, logoutUserController);
router.put(
  "/update-user",
  
  checkUserAuthentication,
  validateUpdateUser,
  validatorResult,
  upload.single("file"),
  updateUserController
);
router.put(
  "/update-privacy",
  
  checkUserAuthentication,
  updateUserPrivacyController
);
router.delete(
  "/delete-user",
  
  checkUserAuthentication,
  deleteUserController
);
router.get(
  "/check-user",
  
  checkUserAuthentication,
  checkUserController
);
router.get(
  "/get-users",
  
  checkUserAuthentication,
  getAllUserController
);
router.get(
  "/get-activity",
  
  checkUserAuthentication,
  getAllActivities
);

export default router;