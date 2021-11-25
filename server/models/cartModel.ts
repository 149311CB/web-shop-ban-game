import { Schema, model } from "mongoose";
import { IGame } from "../types/gameTypes";

export interface IItem {
  product: IGame | string | null;
  quantity: number;
}

export interface ICart {
  user: string;
  products: [IItem];
  status: boolean;
}

const itemSchema = new Schema<IItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Game",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = new Schema<ICart>({
  user: {
    type: Schema.Types.ObjectId,
  },
  products: [itemSchema],
  status: {
    type: Boolean,
    required: true,
  },
});

const Cart = model<ICart>("Cart", cartSchema, "carts");

export { Cart };
