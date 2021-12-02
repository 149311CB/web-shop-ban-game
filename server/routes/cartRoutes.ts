import express from "express";
import passport from "passport";
import {
  authAddToCart,
  authCountItemInCart,
  authGetActiveCart,
  authRemoveFromCart,
  authUpdateQuantity,
  getAllCart,
} from "../controllers/cartControllers";

const router = express.Router();

router.route("/").get(getAllCart);
router.route("/auth/add").post(passport.authenticate("jwt"), authAddToCart);
router
  .route("/auth/active")
  .post(passport.authenticate("jwt"), authGetActiveCart);
router
  .route("/auth/qty/update")
  .post(passport.authenticate("jwt"), authUpdateQuantity);
router
  .route("/auth/remove")
  .post(passport.authenticate("jwt"), authRemoveFromCart);
router
  .route("/auth/count")
  .get(passport.authenticate("jwt"), authCountItemInCart);

export default router;
