import express from "express";
import { getAllGame, getGameById } from "../controllers/productControllers";

const router = express.Router();

router.route("/games").get(getAllGame);
router.route("/games/:id").get(getGameById);

export default router;
