import asyncHandler from "express-async-handler";
import Collection from "../models/collectionSchema.js";

const getColections = asyncHandler(async (req, res) => {
  const collections = await Collection.find({}).populate({
    path: "list_game",
  });
  res.json(collections);
});

// getCollection => getCollectionById
const getCollectionById = asyncHandler(async (req, res) => {
  const collection = await Collection.findById(req.params.Id);
  res.json(collection);
});

const addCollection = asyncHandler(async (req, res) => {
  const collection = await Collection.create(req.body);
  res.json(collection);
});

const deleteCollection = asyncHandler(async (req, res) => {
  const collection = await Collection.findByIdAndDelete(req.params.id);
  if (collection) {
    res.status(200).json({ message: "Delete success" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

const getCollectionByName = asyncHandler(async (req, res) => {
  const { names } = req.query;
  if (!names) {
    return res.status(400).json({ message: "required collection names" });
  }
  if (!typeof names === "array") {
    return res.status(400).json({ message: "name must be an array" });
  }
  try {
    const collections = await Collection.find({
      name: { $in: names },
    }).populate({
      path: "list_game",
      select: "name developer images sale_price",
    });
    return res.status(200).json(collections);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

export {
  getColections,
  getCollectionById,
  addCollection,
  deleteCollection,
  getCollectionByName,
};
