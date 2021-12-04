import asyncHandler from "express-async-handler";
import { Game } from "../models/productModel";

const getAllGame = asyncHandler(async (_, res) => {
  const games = await Game.find({});
  return res.json(games);
});

const getGameById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "required game id" });
    }

    const game = await Game.findById(id).populate("includes included_in");

    if (!game) {
      return res.status(404).json({ message: "game not found" });
    }

    res.status(201).json(game);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

const search = asyncHandler(async (req, res) => {
  const { keyword } = req.query;
  if (!keyword || typeof keyword === "undefined") {
    return res.status(400);
  }
  try {
    const regex = {
      $regex: keyword,
      $options: "i",
    };
    const games = await Game.find({
      //@ts-ignore
      $or: [{ name: regex }, { short_name: regex }, { studio: regex }],
    }).select("name sale_price type images");

    return res.status(200).json(games);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

export { getAllGame, getGameById, search };
