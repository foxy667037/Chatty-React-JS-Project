import jwt from "jsonwebtoken";

export const generateJwtToken = (userId, res) => {
  const JwtToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("JwtToken", JwtToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site request forgery attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "developement", // cookie is only on https in production
  });

  return JwtToken;
};
