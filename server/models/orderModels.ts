import { Schema, model } from "mongoose";

export interface paymentMethodInterface {
  method: string;
  details: Object;
}

export interface orderInterface {
  cart: string;
  user: string;
  state: string;
  paymentMethod: paymentMethodInterface;
  paidAt: Date;
  cancelledAt: Date;
}

const orderSchema = new Schema<orderInterface>(
  {
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Golf",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: Object,
      required: true,
    },
    paidAt: {
      type: Date,
    },
    cancelledAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = model<orderInterface>("Order", orderSchema, "orders");

export default Order;
