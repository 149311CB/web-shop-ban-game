import express from "express";
import { orderUsingPaypal, orderUsingStripe } from "../controllers/paymentController";
import { getPrice } from "../middlewares/getPrice";
import { protect } from "../middlewares/protect";

const router = express.Router();

router.route("/stripe").get(protect, getPrice, orderUsingStripe);
router.route("/paypal").get(protect,getPrice, orderUsingPaypal);

export default router;
