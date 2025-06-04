import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilePicPath: {
    type: String,
  },
  profilePicPublicId: {
    type: String,
  },

  // contact list
  userContactList: {
    type: Array,
    default: [],
  },
  userBlockedContactList: {
    type: Array,
    default: [],
  },

  // verification
  accountVerified: {
    type: Boolean,
    default: true,
  },

  // privacy
  accountPrivate: {
    type: Boolean,
    default: false,
  },
  showOnlineStatus: {
    type: Boolean,
    default: false,
  },
  blockUnknownMsg: {
    type: Boolean,
    default: false,
  },
  loginAlerts: {
    type: Boolean,
    default: false,
  },

  // time
  created_at: {
    type: Date,
    default: Date.now,
  },
  login_at: {
    type: Date,
    default: null,
  },
  logout_at: {
    type: Date,
    default: null,
  },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
