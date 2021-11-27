import asyncHandler from "express-async-handler";
import { Cart } from "../models/cartModel";
import Order from "../models/orderModels";
import { Game } from "../models/productModel";

const getAllOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({});

  res.json(order);
});

const createOrder = asyncHandler(async (req, res) => {
  try {
    const {
      cartId,
      status,
      paymentMethod,
      details,
      paidAt,
      cancelledAt,
      total,
      user,
    } = req.body;

    const createdOrder = await Order.create({
      cart: cartId,
      status: status,
      user: user._id,
      payment_method: {
        method: paymentMethod,
        details: details,
      },
      paid_at: paidAt,
      cancelled_at: cancelledAt,
      total: total,
    });

    const existCart = await Cart.findOne({ _id: cartId });

    if (existCart) {
      existCart.status = false;
      await existCart.save();
      // for (let game of existCart.products) {
      //   const existGame = await Game.findById(game.product);
      //   if (existGame) {
      //     const limit = game.quantity;
      //     let index = 0;
      //     for (let key of existGame.keys) {
      //       if (index === limit) {
      //         break;
      //       }
      //       //@ts-ignore
      //       if (!key.status) {
      //         //@ts-ignore
      //         key.status = true;
      //         index = index + 1;
      //       }
      //     }
      //     existGame.markModified("keys");
      //     await existGame.save();
      //   }
      // }
    }

    return res.status(201).json(createdOrder);
  } catch (error: any) {
    return res.status(500).json({ messsage: error.message });
  }
});

// This is for lab
const createRevenueReport = asyncHandler(async (req, res) => {
  const { from, to } = req.body;
  const order = await Order.find({
    createdAt: {
      $gte: new Date(from).toISOString(),
      $lte: new Date(to).toISOString(),
    },
  })
  .populate({
    path: "cart user",
    select: "products email fist_name last_name",
    populate: { path: "products.product", select: "purchase_price sale_price quantity" },
  });

  res.json(order);
});

export { createOrder, createRevenueReport, getAllOrder };
