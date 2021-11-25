import express from "express";
import { authUser, registerUser } from "../controllers/userControllers";

const router = express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(authUser)

export default router
