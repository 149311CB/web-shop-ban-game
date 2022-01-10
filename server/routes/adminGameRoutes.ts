import express from "express";
import {
  getGameList,
  addGame,
  deleteGame,
  getGame,
} from "../controllers/productControllers.js";

const router = express.Router();

router.get("/", getGameList);
router.post("/add", addGame);
// router.get("/search", getProductLike)
router.get("/:Id", getGame);
router.route("/delete/:id").delete(deleteGame);
// router.get("/trademark/:id", getProductByTrademark)

export default router;
