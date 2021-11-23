import express from "express";
import {
  authAddToCart,
  authGetActiveCart,
  authRemoveFromCart,
  authUpdateQuantity,
  getAllCart,
} from "../controllers/cartControllers";

const router = express.Router();

router.route("/").get(getAllCart);
router.route("/auth/add").post(authAddToCart);
router.route("/auth/active").post(authGetActiveCart);
router.route("/auth/qty/update").post(authUpdateQuantity);
router.route("/auth/remove").post(authRemoveFromCart);

export default router;
