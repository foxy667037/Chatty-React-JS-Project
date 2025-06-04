import UserModel from "../models/auth.model.js";
import MessageModel from "../models/message.model.js";
import cloudinary from "../databases/cloudinary.database.js";

// get all users for search
export const getUsersController = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filterdUsers = await UserModel.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json({ users: filterdUsers });
  } catch (error) {
    console.log("Error in getUserController.", error.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// get all messages related to sender and receiver
export const getMessageController = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const messages = await MessageModel.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    res.status(200).json({ messages: messages });
  } catch (error) {
    console.log("Error in fetching message controller", error.message);
    res.status(500).json({ msg: "Internal Server Error;" });
  }
};

// send message
export const sendMessageController = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const { message } = req.body;
    const file = req.file;

    let message_image_path = "null";
    let message_image_public_id = "null";

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.mimetype)) {
        return res
          .status(400)
          .json({ error: "Only JPEG, PNG, and GIF images are allowed." });
      }

      const maxSize = 10 * 1024 * 1024;
      if (req.file.size > maxSize) {
        return res
          .status(400)
          .json({ error: "File size must not exceed 10MB." });
      }

      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "message_images",
      });
      if (!uploadResult) {
        return res.status(500).json({ msg: "Error in image upload." });
      }
      message_image_path = uploadResult.secure_url;
      message_image_public_id = uploadResult.public_id;
    }

    const newMessage = new MessageModel({
      senderId: senderId,
      receiverId: receiverId,
      msg: message,
      messagePicPath: message_image_path,
      messagePicPublicId: message_image_public_id,
    });

    // -> todo: apply socket io for sending msg.

    res.status(200).json({ msg: newMessage });
  } catch (error) {
    console.log("Error in send message controller.");
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
