import asyncHandler from "express-async-handler";
import { Cart, ICart, IItem } from "../models/cartModel";
import jwt from "jsonwebtoken";
import { COOKIES_OPTIONS, generateRefreshToken } from "../utils/generateToken";

const getAllCart = asyncHandler(async (_, res) => {
  const carts = await Cart.find({});
  return res.json(carts);
});

const addToCart = async (exist: any, product: any, res: any) => {
  // if product exist in cart, increase it's quantity
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
    // if product not found => create cart
    exist.products.push({
      product: product._id,
      quantity: product.quantity,
      keys: [],
    });
  }

  await exist.save();
  return quantityInCart;
};

const authAddToCart = asyncHandler(async (req, res) => {
  const { user } = req;
  const { product } = req.body;
  try {
    if (!user) {
      return res.status(401);
    }

    const exist = await Cart.findOne({
      user: user._id,
      status: true,
    }).populate({
      path: "products.product",
      match: { _id: { $eq: product._id } },
      option: { limit: 1 },
    });

    if (exist) {
      const quantityInCart = await addToCart(exist, product, res);
      return res.status(200).json({ qty_in_cart: quantityInCart });
    } else {
      // if cart not found => create
      const newCart = new Cart({
        user: user._id,
        products: [{ product: product._id, quantity: product.quantity }],
        status: true,
      });

      await newCart.save();
      return res.status(201).json({ qty_in_cart: product.quantity });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export const getCartId = asyncHandler(async (req, res, next) => {
  const { signedCookies = {} } = req;
  const { cart_token: cartToken } = signedCookies;
  if (!cartToken) {
    return next();
  } else {
    // @ts-ignore
    const { cartId } = jwt.verify(cartToken, process.env.REFRESH_TOKEN_SECRET!);
    req.cartId = cartId;
    next();
  }
});

const guestAddToCart = asyncHandler(async (req, res) => {
  const { cartId } = req;
  // const { signedCookies = {} } = req;
  // const { cart_token: cartToken } = signedCookies;
  const { product } = req.body;
  if (!cartId) {
    const newCart = new Cart({
      user: null,
      products: [{ product: product._id, quantity: product.quantity }],
      status: true,
    });
    await newCart.save();
    res.cookie(
      "cart_token",
      generateRefreshToken({ cartId: newCart._id }),
      COOKIES_OPTIONS
    );
    return res.status(200).json({ qty_in_cart: product.quantity });
  } else {
    const exist = await Cart.findById(cartId).populate({
      path: "products.product",
      match: { _id: { $eq: product._id } },
      option: { limit: 1 },
    });
    console.log(exist);
    const quantityInCart = await addToCart(exist, product, res);
    return res.status(200).json({ qty_in_cart: quantityInCart });
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

const getActiveCart = asyncHandler(async (req, res) => {
  const { select } = req.body;
  const { cartId } = req;
  try {
    const exist = await Cart.findById(cartId)
      .populate({
        path: "products.product",
      })
      .select(select && select !== undefined ? select.toString() : undefined);
    if (!exist) {
      return res.status(404).json({ message: "not found" });
    }

    return res.status(200).json({
      _id: exist._id,
      products: exist.products,
      status: exist.status,
      user: exist.user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

const updateQty = async (exist: any, product: any, res: any) => {
  if (!exist) {
    return res.status(404).json({ message: "cart not found" });
  }

  const updateItem = exist.products.find((item: any) => {
    return item.product == product.product._id;
  });

  if (!updateItem) {
    return res
      .status(404)
      .json({ message: "item had been removed or something :))" });
  }

  updateItem.quantity = product.quantity;

  const updatedCart = await exist.save();
  res.status(200).json(updatedCart);
};

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
    await updateQty(exist, product, res);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

const updateQuantity = asyncHandler(async (req, res) => {
  const { cartId } = req;
  const { product } = req.body;
  try {
    const exist = await Cart.findById(cartId);
    await updateQty(exist, product, res);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

const removeItem = async (exist: any, product: any, res: any) => {
  if (exist) {
    let itemIndex = -1;
    exist.products.find((item: any, index: number) => {
      if (item.product == product._id) {
        itemIndex = index;
      }
    });
    if (itemIndex > -1) {
      exist.products.splice(itemIndex, 1);
    }
    const updatedCart = await exist.save();
    return res.status(200).json(updatedCart);
  } else {
    return res.json({ message: "cart not found" });
  }
};

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
      await removeItem(exist, product, res);
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

const removeFromCart = asyncHandler(async (req, res) => {
  const { cartId } = req;
  const { product } = req.body;
  try {
    const cart = await Cart.findById(cartId);
    await removeItem(cart, product, res);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

const totalItems = (exist: ICart) => {
  let totalItems = 0;
  exist.products.forEach((product: any) => {
    totalItems = totalItems + product.quantity;
  });
  return totalItems;
};

const authCountItemInCart = asyncHandler(async (req, res) => {
  const { user } = req;
  try {
    if (!user) return res.status(401);
    const exist = await Cart.findOne({ user: user._id, status: true });

    if (exist) {
      return res
        .status(200)
        .json({ count: exist.products.length, total_items: totalItems(exist) });
    }
    return res.status(200).json({ count: 0 });
  } catch (error) {
    res.status(500);
  }
});

const countItemInCart = asyncHandler(async (req, res) => {
  const { cartId } = req;
  try {
    const exist = await Cart.findById(cartId);
    if (!exist) {
      return res.status(200).json({ count: 0 });
    }
    return res
      .status(200)
      .json({ count: exist.products.length, total_items: totalItems(exist) });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

export {
  getAllCart,
  authAddToCart,
  guestAddToCart,
  authGetActiveCart,
  getActiveCart,
  authUpdateQuantity,
  updateQuantity,
  authRemoveFromCart,
  removeFromCart,
  authCountItemInCart,
  countItemInCart,
};
