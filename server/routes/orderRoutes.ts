import express from "express";
import {
  createOrder,
  createRevenueReport,
  getAllOrder,
} from "../controllers/orderControllers";
import { protect } from "../middlewares/protect";

const router = express.Router();

router.route("/all").get(getAllOrder);
router.route("/create").post(protect, createOrder);
router.route("/revenue").post(createRevenueReport);

export default router;
