import asyncHandler from "express-async-handler";
import { Game } from "../models/productModel";

const getAllGame = asyncHandler(async (_, res) => {
  const games = await Game.find({});
  return res.json(games);
});

const getGameById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params)
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

export { getAllGame, getGameById };
