import express from "express";
import {
  createOrder,
  createRevenueReport,
  getAllOrder,
  getAllOrderByUser,
  getOrderById,
  getOrders,
} from "../controllers/orderControllers";
import { verifyUser } from "../controllers/strategies/jwtStrategy";

const router = express.Router();

router.get("/", getOrders)
router.route("/all").get(getAllOrder);
router.route("/create").post(verifyUser, createOrder);
router.route("/user/all").get(verifyUser, getAllOrderByUser)
router.route("/revenue").post(createRevenueReport);
router.route("/:id").get(getOrderById);

export default router;
