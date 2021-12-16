import asyncHandler from "express-async-handler";
import Collection from "../models/collectionSchema.js";
import { Game } from "../models/productModel";
import util from "util";

const getOptionalQueries = (
  filters: string[] | undefined,
  keyword: string | undefined,
  collectionFilter: string[] | undefined
) => {
  let optionalQueries = [];

  if (collectionFilter) {
    optionalQueries.push({ _id: { $in: collectionFilter } });
  }

  if (filters) {
    optionalQueries.push({ tag: { $all: filters } });
  }

  if (keyword && keyword !== "") {
    const regex = {
      $regex: keyword,
      $options: "i",
    };
    optionalQueries.push({
      $or: [{ name: regex }, { short_name: regex }, { studio: regex }],
    });
  }

  if (Object.keys(optionalQueries).length > 0) {
    // @ts-ignore
    return { $and: optionalQueries };
  }
  return {};
};

const getAllGame = asyncHandler(async (req, res) => {
  let { limit = 0, skip = 0, keyword = "", collection } = req.query;
  try {
    let filters;
    if (req.body) {
      filters = req.body.filters;
    }

    if (limit && typeof limit === "string") {
      limit = parseInt(limit);
    }
    if (skip && typeof skip === "string") {
      skip = parseInt(skip);
    }
    if (typeof limit === "number" && typeof skip === "number") {
      let collectionFilter;
      let total;
      if (collection) {
        //@ts-ignore
        const result = await Collection.findOne({ name: collection });
        collectionFilter = result.list_game;
        total = result.list_game.length;
      }
      const games = await Game.find(
        //@ts-ignore
        getOptionalQueries(filters, keyword, collectionFilter)
      )
        .select("name developer sale_price images")
        .skip(limit * skip)
        .limit(limit);
      if (!total || total === undefined) {
        total = await Game.countDocuments();
      }
      return res.status(200).json({
        total_docs: total,
        total_pages: Math.ceil(total / limit),
        tail_docs: total - Math.floor(total / limit) * limit,
        current_page: skip + 1,
        data: games,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
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
    })
      .limit(5)
      .select("name sale_price type images");

    return res.status(200).json(games);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

export { getAllGame, getGameById, search };
