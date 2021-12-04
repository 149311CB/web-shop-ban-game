import express from "express";
import {
  createReview,
  getAllReviewByProduct,
  getReviewByUser,
  reviewAble,
  updateReviewByUser,
} from "../controllers/reviewControllers";
import { verifyUser } from "../controllers/strategies/jwtStrategy";

const router = express.Router();

router.route("/auth/create").post(verifyUser, createReview);
router.route("/auth/get").get(verifyUser, getReviewByUser);
router.route("/all").get(getAllReviewByProduct);
router.route("/auth/verify").get(verifyUser, reviewAble);
router.route("/auth/update").post(verifyUser, updateReviewByUser);

export default router;
