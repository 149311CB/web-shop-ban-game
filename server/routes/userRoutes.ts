import express from "express";
import passport from "passport";
import { verifyUser } from "../controllers/strategies/jwtStrategy";
import {
  login,
  getUserDetails,
  refreshTokenController,
  registerUser,
  logout,
} from "../controllers/userControllers";

const router = express.Router();

router.route("/register").post(registerUser);
router
  .route("/login/facebook")
  .get(
    passport.authenticate("facebook", { scope: ["public_profile", "email"] })
  );

router.route("/login/failed").get((_, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router
  .route("/login/facebook/callback")
  .get(passport.authenticate("facebook"), login);

router
  .route("/login/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router
  .route("/login/google/callback")
  .get(passport.authenticate("google"), login);

router.route("/login").post(passport.authenticate("local"), login);
router.route("/token/refresh").post(refreshTokenController);
router.route("/logout").get(verifyUser, logout);
router.route("/details").post(verifyUser, getUserDetails);

export default router;
