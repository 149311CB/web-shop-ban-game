import asyncHandler from "express-async-handler";
import { Cart, IItem } from "../models/cartModel";

const getAllCart = asyncHandler(async (_, res) => {
  const carts = await Cart.find({});
  return res.json(carts);
});

const authAddToCart = asyncHandler(async (req, res) => {
  const { user, product } = req.body;
  try {
    let exist;
    if (user) {
      exist = await Cart.findOne({
        user: user._id,
        isActive: true,
      });
    }

    if (exist) {
      const existItem = exist.products.find((item: IItem) => {
        return item.product == product._id;
      });

      if (existItem) {
        existItem.quantity = existItem.quantity + product.quantity;
      } else {
        exist.products.push({
          product: product._id,
          quantity: product.quantity,
        });
      }

      const cart = await exist.save();
      if (user) {
        return res.status(201).json(cart);
      } else if (cart) {
        return res.status(201).json({ cart });
      }
    } else {
      const newCart = new Cart({
        user: user._id,
        products: [{ product: product._id, quantity: product.quantity }],
        isActive: true,
      });

      const cart = await newCart.save();
      res.status(201).json(cart);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

const authGetActiveCart = asyncHandler(async (req, res) => {
  const { user } = req.body;
  let exist;
  if (user) {
    exist = await Cart.findOne({
      isActive: true,
      user: user._id,
    }).populate({
      path: "products.product",
    });
  }

  if (!exist) {
    return res.status(404).json({ message: "not found" });
  }

  return res.status(201).json({
    _id: exist._id,
    products: exist.products,
    isActive: exist.isActive,
    user: exist.user,
  });
});

const authUpdateQuantity = asyncHandler(async (req, res) => {
  const { user, product } = req.body;
  try {
    const exist = await Cart.findOne({
      user: user._id,
      isActive: true,
    });

    if (!exist) {
      return res.status(404).json({ message: "cart not found" });
    }

    // if (exist._id !== product._id) {
    //   return res
    //     .status(401)
    //     .json({ message: "Not authorized, wrong cart for current user" });
    // }

    const updateItem = exist.products.find((item) => {
      return item.product == product.product._id;
    });

    if (!updateItem) {
      return res
        .status(404)
        .json({ message: "item had been removed or something :))" });
    }

    updateItem.quantity = product.quantity;

    const updatedCart = await exist.save();
    res.status(201).json(updatedCart);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

export { getAllCart, authAddToCart, authGetActiveCart, authUpdateQuantity };
