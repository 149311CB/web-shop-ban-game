import express from "express";
import passport from "passport";
import {
  verifyEmailToken,
  verifyUser,
} from "../controllers/strategies/jwtStrategy";
import {
  login,
  getUserDetails,
  refreshTokenController,
  registerUser,
  logout,
  updateEmail,
  updatePassword,
  verifyEmail,
  createCredential,
  getAllUser,
  createPassword,
  updatePersonalDetails,
  resetPasswordRequest,
  resetPassword,
  getUsers,
  getUser,
} from "../controllers/userControllers";
import { sendVerificationEmail } from "../middlewares/verifyEmail";

const router = express.Router();

router.route("/reset-pass-request").post(resetPasswordRequest);
router.route("/reset-pass").post(resetPassword);
router.route("/login/failed").get((_, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router
  .route("/login/facebook")
  .get(
    passport.authenticate("facebook", { scope: ["public_profile", "email"] })
  );

router
  .route("/login/facebook/callback")
  .get(passport.authenticate("facebook"), login);

router
  .route("/login/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router
  .route("/login/google/callback")
  .get(passport.authenticate("google"), login);

router
  .route("/register")
  .post(registerUser, sendVerificationEmail, createCredential);
router.route("/email/verify").get(verifyEmailToken, verifyEmail);
router.route("/create-pass").post(createPassword);
router.route("/login").post(passport.authenticate("local"), login);
router.route("/token/refresh").post(refreshTokenController);
router.route("/logout").get(verifyUser, logout);
router.route("/details").post(verifyUser, getUserDetails);
router.route("/profile/update/email").post(verifyUser, updateEmail);
router.route("/profile/update/password").post(verifyUser, updatePassword);
router.route("/all").get(getAllUser);
router
  .route("/profile/personal-details/update")
  .post(verifyUser, updatePersonalDetails);
router.get("/", getUsers)
router.get('/:Id', getUser)

export default router;
