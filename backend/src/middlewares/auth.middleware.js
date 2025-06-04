import jwt from "jsonwebtoken";
import UserModel from "../models/auth.model.js";

const checkUserAuthentication = async (req, res, next) => {
  try {
    const JwtToken = req.cookies.JwtToken;
    if (!JwtToken) {
      return res
        .status(401)
        .json({ msg: "Unauthorized - No Token Provided." });
    }
    const decoded = jwt.verify(JwtToken, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ msg: "Unauthorized - Invalid Token." });
    }

    const user = await UserModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User Not Found." });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in auth middleware.");
    return res.status(401).json({ msg: "Unauthorized - Invalid Token." });
  }
};

export default checkUserAuthentication;
