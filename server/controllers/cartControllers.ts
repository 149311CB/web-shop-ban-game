import asyncHandler from "express-async-handler";
import { Cart, IItem } from "../models/cartModel";

const getAllCart = asyncHandler(async (_, res) => {
  const carts = await Cart.find({});
  return res.json(carts);
});

const authAddToCart = asyncHandler(async (req, res) => {
  const { user } = req;
  const { product } = req.body;
  try {
    let exist;
    if (user) {
      exist = await Cart.findOne({
        user: user._id,
        status: true,
      }).populate({
        path: "products.product",
        match: { _id: { $eq: product._id } },
        option: { limit: 1 },
      });
    } else {
      return res.status(401);
    }

    if (exist) {
      const existItem: any = exist.products.find((item: IItem) => {
        return item.product !== null;
      });
      let quantityInCart = product.quantity;

      if (existItem) {
        const availabledKeys = existItem.product.keys.filter((key: any) => {
          return key.status === false;
        });

        if (existItem.quantity + product.quantity > availabledKeys.length) {
          return res.status(200).json({
            message: `exceed quantity`,
            details: {
              max: availabledKeys.length,
              in_cart: existItem.quantity,
              request: product.quantity,
            },
          });
        }

        existItem.quantity = existItem.quantity + product.quantity;
        quantityInCart = existItem.quantity;
      } else {
        exist.products.push({
          product: product._id,
          quantity: product.quantity,
          keys: [],
        });
      }

      await exist.save();

      return res.status(200).json({ qty_in_cart: quantityInCart });
    } else {
      const newCart = new Cart({
        user: user._id,
        products: [{ product: product._id, quantity: product.quantity }],
        status: true,
      });

      const cart = await newCart.save();
      return res.status(201).json(cart);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

const authGetActiveCart = asyncHandler(async (req, res) => {
  const { user } = req;
  const { select } = req.body;
  let exist;
  if (user) {
    exist = await Cart.findOne({
      status: true,
      user: user._id,
    })
      .populate({
        path: "products.product",
      })
      .select(select && select !== undefined ? select.toString() : undefined);
  }

  if (!exist) {
    return res.status(404).json({ message: "not found" });
  }

  return res.status(200).json({
    _id: exist._id,
    products: exist.products,
    status: exist.status,
    user: exist.user,
  });
});

const authUpdateQuantity = asyncHandler(async (req, res) => {
  const { user } = req;
  const { product } = req.body;
  try {
    if (!user) {
      return res.status(401);
    }
    const exist = await Cart.findOne({
      user: user._id,
      status: true,
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
    // console.log(updateItem);

    if (!updateItem) {
      return res
        .status(404)
        .json({ message: "item had been removed or something :))" });
    }

    updateItem.quantity = product.quantity;

    const updatedCart = await exist.save();
    res.status(200).json(updatedCart);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

const authRemoveFromCart = asyncHandler(async (req, res) => {
  const { user } = req;
  const { product } = req.body;
  try {
    if (!user) {
      return res.status(401);
    }
    let exist;
    if (user) {
      exist = await Cart.findOne({
        user: user._id,
        status: true,
      });
      // console.log(product);

      if (exist) {
        let itemIndex = -1;
        exist.products.find((item, index) => {
          if (item.product == product._id) {
            itemIndex = index;
          }
        });
        // console.log(itemIndex);
        if (itemIndex > -1) {
          exist.products.splice(itemIndex, 1);
        }
        // console.log(exist.products);
        const updatedCart = await exist.save();
        return res.status(200).json(updatedCart);
      } else {
        return res.json({ message: "cart not found" });
      }
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

const authCountItemInCart = asyncHandler(async (req, res) => {
  const { user } = req;
  try {
    if (!user) return res.status(401);
    const exist = await Cart.findOne({ user: user._id, status: true });
    let totalItems = 0;
    if (exist) {
      exist.products.forEach((product: any) => {
        totalItems = totalItems + product.quantity;
      });
      return res.status(200).json({ count: exist.products.length, totalItems });
    }
    return res.status(200)
  } catch (error) {
    res.status(500);
  }
});

export {
  getAllCart,
  authAddToCart,
  authGetActiveCart,
  authUpdateQuantity,
  authRemoveFromCart,
  authCountItemInCart,
};
