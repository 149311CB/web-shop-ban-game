import express from "express";
import passport from "passport";
import {
  orderUsingPaypal,
  orderUsingStripe,
} from "../controllers/paymentController";
import { getPrice } from "../middlewares/getPrice";

const router = express.Router();

router
  .route("/stripe")
  .get(passport.authenticate("jwt"), getPrice, orderUsingStripe);
router
  .route("/paypal")
  .get(passport.authenticate("jwt"), getPrice, orderUsingPaypal);

export default router;
