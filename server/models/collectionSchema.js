import mongoose from "mongoose";

var collectionSchema = new mongoose.Schema(
  {
    name: String,
    list_game: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
      },
    ],
  },
  {
    versionKey: false,
  }
);

const Collection = mongoose.model(
  "Collection",
  collectionSchema,
  "collections"
);

export default Collection;
