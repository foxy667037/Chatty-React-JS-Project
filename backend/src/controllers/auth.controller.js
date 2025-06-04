import bcrypt from "bcryptjs";
import UserModel from "../models/auth.model.js";
import cloudinary from "../databases/cloudinary.database.js";
import userActivityModel from "../models/authActivity.model.js";
import { generateJwtToken } from "../utils/generateJwtToken.util.js";

// create-user controller
export const createUserController = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;
    const file = req.file || null;
    let profile_image_path = "null";
    let profile_image_public_id = "null";

    const user = await UserModel.findOne({ email });
    if (user) return res.status(400).json({ msg: "Email already exist!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.mimetype)) {
        return res
          .status(400)
          .json({ msg: "Only JPEG, PNG, and GIF images are allowed." });
      }

      const maxSize = 10 * 1024 * 1024;
      if (req.file.size > maxSize) {
        return res.status(400).json({ msg: "File size must not exceed 10MB." });
      }

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "profile_images",
      });
      if (!uploadResult) {
        return res.status(500).json({ msg: "Error in image upload." });
      }
      profile_image_path = uploadResult.secure_url;
      profile_image_public_id = uploadResult.public_id;
    }

    const newUser = new UserModel({
      fullName,
      username,
      email,
      password: hashedPassword,
      profilePicPath: profile_image_path,
      profilePicPublicId: profile_image_public_id,
    });

    if (newUser) {
      generateJwtToken(newUser._id, res);
      const savedUser = await newUser.save();
      if (savedUser) {
        const activityData = new userActivityModel({
          userId: savedUser._id,
          username: savedUser.username,
          action: "Account Creation",
        });

        const savedActivityData = activityData.save();

        res.status(201).json({
          msg: `User created with this id: ${newUser._id}`,
          user: savedUser,
        });
      } else {
        res.status(400).json({ msg: `Cannot saved user into database.` });
      }
    } else {
      res.status(400).json({ msg: `Invalid User data!` });
    }
  } catch (error) {
    console.log("Error in signup controller.");
    res.status(500).json({ msg: error.message });
  }
};

// login-user controller
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials!" });

    const isPasswordCorrected = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrected) {
      return res.status(400).json({ msg: "Invalid Credentials!" });
    }

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    generateJwtToken(user._id, res);

    const loginAt = await UserModel.findByIdAndUpdate(
      user._id,
      { login_at: new Date() },
      { new: true }
    );
    const activityData = new userActivityModel({
      userId: user._id,
      username: user.username,
      action: "Account Login",
    });

    const savedActivityData = activityData.save();

    res
      .status(201)
      .json({ msg: `User login successfully.`, user: userWithoutPassword });
  } catch (error) {
    console.log("Error in login controller.");
    res.status(500).json({ msg: error.message });
  }
};

// logout-user controller
export const logoutUserController = async (req, res) => {
  try {
    const userId = req.user._id;
    res.cookie("JwtToken", "", { maxAge: 0 });

    const logoutAt = await UserModel.findByIdAndUpdate(
      userId,
      { logout_at: new Date() },
      { new: true }
    );
    const activityData = new userActivityModel({
      userId: userId,
      username: req.user.username,
      action: "Account Logout",
    });

    const savedActivityData = activityData.save();
    res.status(200).json({ msg: "User logout successfully." });
  } catch (error) {
    console.log("Error in logout controller.");
    res.status(500).json({ msg: error.message });
  }
};

// update-user controller
export const updateUserController = async (req, res) => {
  try {
    const { fullName, email, password, username } = req.body;
    const file = req.file;

    console.log(fullName, username, email, password, file);

    const userId = req.user._id;
    let profile_image_path = "";
    let profile_image_public_id = "";

    if (!file && !fullName && !email && !username) {
      return res.status(400).json({
        msg: "Profile picture or full name or Password is required",
      });
    }

    const updateFields = {};

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.mimetype)) {
        return res
          .status(400)
          .json({ msg: "Only JPEG, PNG, and GIF images are allowed." });
      }

      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        return res.status(400).json({ msg: "File size must not exceed 10MB." });
      }

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "profile_images",
      });
      if (!uploadResult) {
        return res.status(400).json({ msg: "Error in image upload." });
      }
      profile_image_path = uploadResult.secure_url;
      profile_image_public_id = uploadResult.public_id;
      updateFields.profilePicPath = profile_image_path;
      updateFields.profilePicPublicId = profile_image_public_id;
    }

    if (fullName) updateFields.fullName = fullName;

    if (email) updateFields.email = email;

    if (username) updateFields.username = username;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res
      .status(200)
      .json({ msg: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.log("Error in update user controller.");
    res.status(500).json({ msg: error.message });
  }
};
export const updateUserPrivacyController = async (req, res) => {
  try {
    const { accountPrivate, showOnlineStatus, blockUnknownMsg, loginAlerts } =
      req.body;

    const userId = req.user._id;
    const updateFields = {};

    if (accountPrivate !== undefined)
      updateFields.accountPrivate = accountPrivate;
    if (showOnlineStatus !== undefined)
      updateFields.showOnlineStatus = showOnlineStatus;
    if (blockUnknownMsg !== undefined)
      updateFields.blockUnknownMsg = blockUnknownMsg;
    if (loginAlerts !== undefined) updateFields.loginAlerts = loginAlerts;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res
      .status(200)
      .json({ msg: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.log("Error in update user controller.");
    res.status(500).json({ msg: error.message });
  }
};

// delete-user controller
export const deleteUserController = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await UserModel.findByIdAndDelete(userId);

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.log("Error in delete user controller.");
    res.status(500).json({ msg: error.message });
  }
};

// check-user controller
export const checkUserController = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.log("Error in check user controller: ", error);
    res.status(500).json({ msg: "Internal Server Error." });
  }
};

// get all-user controller
export const getAllUserController = async (req, res) => {
  try {
    const userId = req.user._id;

    const users = await UserModel.find({
      $or: [{ _id: { $ne: userId }, accountPrivate: { $ne: true } }],
    }).select("-password");

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error in get all user controller: ", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// get all-activity controller
export const getAllActivities = async (req, res) => {
  try {
    const userId = req.user._id;
    const logs = await userActivityModel.find({ userId }).sort({ time: -1 });
    res.status(200).json({ logs: logs });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch activity logs" });
  }
};
