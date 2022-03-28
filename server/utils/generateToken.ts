import { CookieOptions } from "express";
import jwt from "jsonwebtoken";
const dev = process.env.NODE_ENV !== "production";

const COOKIES_OPTIONS: CookieOptions = {
  path: "/",
  domain: "localhost",
  httpOnly: true,
  secure: true,
  signed: true,
  maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY!) * 1000,
  sameSite: "none",
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
// "web-shop-ban-game.herokuapp.com"
