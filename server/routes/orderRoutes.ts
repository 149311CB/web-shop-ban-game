import express from "express";
import { createOrder } from "../controllers/orderControllers";
import { protect } from "../middlewares/protect";

const router = express.Router();

router.route("/create").post(protect, createOrder);

export default router;
