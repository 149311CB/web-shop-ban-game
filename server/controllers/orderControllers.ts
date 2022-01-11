import asyncHandler from "express-async-handler";
import { Cart } from "../models/cartModel";
import Order from "../models/orderModels";
import { Game } from "../models/productModel";
import { orderConfirmationBuilder } from "../utils/orderConfirmationBuilder";
import sendgrid from "@sendgrid/mail";

const getAllOrder = asyncHandler(async (_, res) => {
  const order = await Order.find({});

  res.json(order);
});

const getOrders = asyncHandler(async (_, res) => {
  const orders = await Order.find({}).populate("cart").populate("user");
  res.json(orders);
});

const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.Id)
    .populate("cart")
    .populate("user");
  res.json(order);
});

const getAllOrderByUser = asyncHandler(async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(404);
  }
  try {
    let { limit, skip } = req.query;
    let lim = 0;
    let start = 0;
    try {
      if (typeof limit === "string") {
        lim = parseInt(limit);
      }
      if (typeof skip === "string") {
        start = parseInt(skip);
      }
    } catch (error) {
      return res.status(500);
    }

    const orders = await Order.find({ user: user._id })
      .skip(start * lim)
      .limit(lim)
      .populate({
        path: "cart",
        select: "products",
        populate: { path: "products.product", select: "name" },
      });
    const total = await Order.countDocuments({ user: user._id });
    return res.status(200).json({
      total_docs: total,
      total_pages: Math.ceil(total / lim),
      tail_docs: total - Math.floor(total / lim) * lim,
      current_page: start + 1,
      data: orders,
    });
  } catch (error) {
    return res.status(500);
  }
});

const createOrder = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    if (!user) return res.status(401);
    const {
      cartId,
      status,
      paymentMethod,
      details,
      paidAt,
      cancelledAt,
      total,
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
    const gameList = [];

    if (existCart) {
      existCart.status = false;
      await existCart.save();
      if (createdOrder.status === "succeeded") {
        for (let game of existCart.products) {
          const existGame = await Game.findById(game.product);
          if (existGame) {
            //@ts-ignore
            gameList.push({ ...existGame._doc, quantity: game.quantity });
            const limit = game.quantity;
            let index = 0;
            for (let key of existGame.keys) {
              if (index === limit) {
                break;
              }
              //@ts-ignore
              if (!key.status) {
                //@ts-ignore
                key.status = true;
                //@ts-ignore
                game.keys.push(key.code);
                index = index + 1;
              }
            }
            existGame.markModified("keys");
            await existGame.save();
            await existCart.save();
          }
        }
        sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);
        const msg = {
          to: user.email,
          from: "xstk2000@gmail.com",
          subject: "Order details",
          html: orderConfirmationBuilder(
            createdOrder.paid_at,
            user,
            createdOrder.payment_method,
            gameList
          ),
        };
        await sendgrid.send(msg);
      }
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
  }).populate({
    path: "cart user",
    select: "products email fist_name last_name",
    populate: {
      path: "products.product",
      select: "purchase_price sale_price quantity",
    },
  });

  res.json(order);
});

const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate({
      path: "cart user",
      populate: { path: "products.product" },
    });

    if (!order) {
      return res.status(404);
    }

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

export {
  createOrder,
  createRevenueReport,
  getAllOrder,
  getOrderById,
  getAllOrderByUser,
  getOrders,
  getOrder,
};
