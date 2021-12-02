import jwt from "jsonwebtoken";
const dev = process.env.NODE_ENV !== "production";

const COOKIES_OPTIONS = {
  path: "/",
  domain:"localhost",
  httpOnly: true,
  secure: !dev,
  signed: true,
  maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY!) * 1000,
  samesite: "none",
};

const generateToken = (payload: Object) => {
  const secret = process.env.JWT_SECRET;
  if (secret) {
    return jwt.sign(payload, secret, {
      expiresIn: eval(process.env.SESSION_EXPIRY!),
    });
  }
};

const generateRefreshToken = (payload: Object) => {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  if (secret) {
    return jwt.sign(payload, secret, {
      expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY!),
    });
  }
};

export { generateToken, generateRefreshToken, COOKIES_OPTIONS };
