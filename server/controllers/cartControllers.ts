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
      }).populate({
        path: "products.product",
        match: { _id: { $eq: product._id } },
        option: { limit: 1 },
      });
    }

    if (exist) {
      const existItem: any = exist.products.find((item: IItem) => {
        return item.product !== null;
      });

      if (existItem) {
        if (
          existItem.quantity + product.quantity >
          existItem.product.keys.length
        ) {
          return res.status(400).json({
            message: `this item can only be bought up to ${existItem.product.keys.length}`,
            details: {
              max: existItem.product.keys.length,
              in_cart: existItem.quantity,
              request: product.quantity,
            },
          });
        }

        existItem.quantity = existItem.quantity + product.quantity;
      } else {
        // if (product.quantity > existItem.product.keys.length) {
        //   return res.status(400).json({
        //     message: `this item can only be bought up to ${existItem.product.keys.length}`,
        //     details: {
        //       max: existItem.product.keys.length,
        //       in_cart: 0,
        //       request: product.quantity,
        //     },
        //   });
        // }
        exist.products.push({
          product: product._id,
          quantity: product.quantity,
        });
      }

      const cart = await exist.save();

      return res.status(201).json(cart);
    } else {
      const newCart = new Cart({
        user: user._id,
        products: [{ product: product._id, quantity: product.quantity }],
        isActive: true,
      });

      const cart = await newCart.save();
      res.status(201).json(cart);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
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
    // console.log(updateItem);

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

const authRemoveFromCart = asyncHandler(async (req, res) => {
  const { user, product } = req.body;
  try {
    let exist;
    if (user) {
      exist = await Cart.findOne({
        user: user._id,
        isActive: true,
      });
      console.log(product);

      if (exist) {
        let itemIndex = -1;
        exist.products.find((item, index) => {
          if (item.product == product._id) {
            itemIndex = index;
          }
        });
        console.log(itemIndex);
        if (itemIndex > -1) {
          exist.products.splice(itemIndex, 1);
        }
        console.log(exist.products);
        const updatedCart = await exist.save();
        return res.status(201).json(updatedCart);
      } else {
        return res.json({ message: "cart not found" });
      }
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export {
  getAllCart,
  authAddToCart,
  authGetActiveCart,
  authUpdateQuantity,
  authRemoveFromCart,
};
