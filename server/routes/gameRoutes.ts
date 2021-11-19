import express from "express";
import { getAllGame, getGameById } from "../controllers/productController";

const router = express.Router();

router.route("/").get(getAllGame);
router.route("/:id").get(getGameById);

export default router;
