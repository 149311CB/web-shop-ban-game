import { Schema, model } from "mongoose";

interface IReview {
  user: string;
  game: string;
  rating: number;
  comment: string;
  images: [string];
}

const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    game: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Game",
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

const Review = model<IReview>("Review", reviewSchema, "reviews");

export default Review;
