import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  short_name: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  developer: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  release_date: {
    type: Date,
    required: false,
  },
  platform: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    // Should describe this more explicit
    type: [Object],
    required: false,
  },
  videos: {
    type: [Object],
    required: false,
  },
  includes: {
    type: [Schema.Types.ObjectId],
    required: false,
  },
  included_in: {
    type: [Schema.Types.ObjectId],
    required: false,
  },
});

const Game = model("Game", productSchema, "games");

export default Game
