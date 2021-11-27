import { Schema, model } from "mongoose";

export interface paymentMethodInterface {
  method: string;
  details: Object;
}

export interface orderInterface {
  cart: string;
  user: string;
  status: string;
  payment_method: paymentMethodInterface;
  paid_at: Date;
  cancelled_at: Date;
  total: Number;
}

const orderSchema = new Schema<orderInterface>(
  {
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    payment_method: {
      type: Object,
      required: true,
    },
    paid_at: {
      type: Date,
    },
    cancelled_at: {
      type: Date,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = model<orderInterface>("Order", orderSchema, "orders");

export default Order;
