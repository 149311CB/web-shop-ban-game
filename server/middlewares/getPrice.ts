import asyncHandler from "express-async-handler";
import { Cart } from "../models/cartModel";

const getPrice = asyncHandler(async (req, res, next) => {
  const { user } = req.body;
  const cart = await Cart.findOne({ user: user._id, status: true }).populate({
    path: "products.product",
    select: "price",
  });

  let total = 0;

  if (cart) {
    cart.products.forEach((item) => {
      //@ts-ignore
      total = total + item.quantity * item.product.price;
    });
    req.body.total = total;
    return next();
  }

  return res.status(404).json({ message: "cart not found" });
});

export { getPrice };
