import express from "express";
import {
  getAllGame,
  getGameById,
  search,
} from "../controllers/productControllers";

const router = express.Router();

router.route("/games/all").post(getAllGame);
router.route("/games/search").get(search);
router.route("/games/:id").get(getGameById);

export default router;
