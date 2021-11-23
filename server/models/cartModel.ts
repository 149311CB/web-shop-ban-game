import { Schema, model } from "mongoose";

export interface IItem {
  product: string;
  quantity: number;
}

export interface ICart {
  user: string;
  products: [ IItem ];
  isActive: boolean;
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
  isActive: {
    type: Boolean,
    required: true,
  },
});

const Cart = model<ICart>("Cart", cartSchema, "carts");

export { Cart };
