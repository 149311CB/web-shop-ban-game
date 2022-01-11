import express from "express";
import passport from "passport";
import {
  authAddToCart,
  authCountItemInCart,
  authGetActiveCart,
  authRemoveFromCart,
  authUpdateQuantity,
  countItemInCart,
  getActiveCart,
  getCart,
  getCartId,
  getCarts,
  guestAddToCart,
  removeFromCart,
  updateCart,
  updateQuantity,
} from "../controllers/cartControllers";

const router = express.Router();

router.route("/").get(getCarts);
router
  .route("/auth/update")
  .get(passport.authenticate("jwt"), getCartId, updateCart);
router.route("/auth/add").post(passport.authenticate("jwt"), authAddToCart);
router.route("/add").post(getCartId, guestAddToCart);
router
  .route("/auth/active")
  .post(passport.authenticate("jwt"), authGetActiveCart);
router.route("/active").post(getCartId, getActiveCart);
router
  .route("/auth/qty/update")
  .post(passport.authenticate("jwt"), authUpdateQuantity);
router.route("/qty/update").post(getCartId, updateQuantity);
router
  .route("/auth/remove")
  .post(passport.authenticate("jwt"), authRemoveFromCart);
router.route("/remove").post(getCartId, removeFromCart);
router
  .route("/auth/count")
  .get(passport.authenticate("jwt"), authCountItemInCart);
router.route("/count").get(getCartId, countItemInCart);
router.route(":id").get(getCart);

export default router;
