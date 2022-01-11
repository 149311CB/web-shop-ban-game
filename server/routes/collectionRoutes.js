import express from "express";
import {
  getCollections,
  getCollection,
  addCollection,
  getCollectionByName,
  deleteCollection
} from "../controllers/collectionSchema.js";

const router = express.Router();

router.get("/", getCollections);
router.post("/add", addCollection);
router.route("/name").get(getCollectionByName);
router.get("/:Id", getCollection);
router.route("/delete/:id").delete(deleteCollection)

export default router;
