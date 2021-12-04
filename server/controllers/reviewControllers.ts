import asyncHandler from "express-async-handler";
import { Cart } from "../models/cartModel";
import Order from "../models/orderModels";
import Review from "../models/reviewModel";

const createReview = asyncHandler(async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401);
  }

  try {
    const { gameId, rating, comment, images } = req.body;
    if (!gameId || !rating || !comment) {
      return res.status(400).json({ message: "missing field" });
    }

    const exist = await Review.findOne({ user: user._id, game: gameId });

    if (exist) {
      return res.status(400).json({ message: "comment already exist" });
    }

    const review = await Review.create({
      user: user._id,
      game: gameId,
      rating,
      comment,
      images,
    });

    return res.status(201).json(review);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

const getAllReviewByProduct = asyncHandler(async (req, res) => {
  try {
    const { gameId } = req.query;
    if (!gameId) {
      return res.status(400).json({ message: "required game id" });
    }

    // @ts-ignore
    const reviews = await Review.find({ game: gameId })
      .populate({
        path: "user",
        select: "first_name last_name avatar",
      })
      .select("-__v");

    return res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

const getReviewByUser = asyncHandler(async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401);
  }
  try {
    const { gameId } = req.query;
    if (!gameId) {
      return res.status(400).json({ message: "required game id" });
    }

    // @ts-ignore
    const exist = await Review.findOne({ game: gameId, user: user._id }).select(
      "-__v"
    );
    return res.status(200).json(exist);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

const updateReviewByUser = asyncHandler(async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401);
  }
  try {
    const { commentId } = req.query;
    const { rating, comment, images } = req.body;
    const exist = await Review.findById(commentId);
    if (!exist) {
      return res.status(404);
    }
    exist.rating = rating;
    exist.comment = comment;
    exist.images = images;
    const updated = await exist.save();
    return res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

const reviewAble = asyncHandler(async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401);
  }
  try {
    const { gameId } = req.query;
    const carts = await Cart.find({ user: user._id, status: false }).elemMatch(
      "products",
      { product: gameId }
    );
    if (!carts) {
      return res.status(200).json({ message: "not authorized" });
    }
    const order = await Order.findOne({
      // @ts-ignore
      cart: { $in: carts },
      status: "succeeded",
    });
    if (!order) {
      return res.status(200).json({ message: "not authorized" });
    }
    return res.status(200).json({ message: "authorized" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

export {
  createReview,
  getAllReviewByProduct,
  reviewAble,
  getReviewByUser,
  updateReviewByUser,
};
