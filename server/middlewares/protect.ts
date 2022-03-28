import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import jwt from "jsonwebtoken";

export const protect = asyncHandler(async (req, res, next): Promise<any> => {
  let token;
  try {
    const result = verifyToken(req);
    if (result) {
      // @ts-ignore
      const { userId, ...rest } = result;
      // if the user exist in token, use user
      if (userId) {
        const user = await User.findById(userId).select("-password");
        if (user) {
          req.body = { ...req.body, rest, user };
          return next();
        }
      }
      return res.status(401).json({ message: "Not authorized, token found" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
});

export const verifyToken = (req: any) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (token !== "null") {
      const secret = process.env.JWT_SECRET;
      if (secret) {
        const decoded = jwt.verify(token, secret);
        return decoded;
      }
    }
  }
  return {};
};
