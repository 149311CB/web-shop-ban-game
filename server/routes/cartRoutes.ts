import express from "express";
import {
  authAddToCart,
  authCountItemInCart,
  authGetActiveCart,
  authRemoveFromCart,
  authUpdateQuantity,
  getAllCart,
} from "../controllers/cartControllers";
import { protect } from "../middlewares/protect";

const router = express.Router();

router.route("/").get(getAllCart);
router.route("/auth/add").post(protect, authAddToCart);
router.route("/auth/active").post(protect, authGetActiveCart);
router.route("/auth/qty/update").post(protect, authUpdateQuantity);
router.route("/auth/remove").post(protect, authRemoveFromCart);
router.route("/auth/count").post(authCountItemInCart);

export default router;
