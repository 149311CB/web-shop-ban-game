import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import {
  generateToken,
  generateRefreshToken,
  COOKIES_OPTIONS,
} from "../utils/generateToken";
import jwt from "jsonwebtoken";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401);
  }

  const { _id } = req.user;

  const exist = await User.findById(_id);

  if (exist) {
    try {
      const refreshToken = generateRefreshToken({ userId: _id });
      exist.refresh_token = refreshToken!;
      await exist.save();
      res.cookie("refresh_token", refreshToken, COOKIES_OPTIONS);
      // res
      //   .json({
      //     login: "success",
      //     token: generateToken({ userId: _id }),
      //   })
      res.redirect("https://localhost:3000");
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      birthday,
      email,
      password,
      confirm_pass,
      phone_number,
    } = req.body;

    if (password !== confirm_pass) {
      return res
        .status(401)
        .json({ message: "password not match confirmation" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      first_name,
      middle_name: "",
      birthday,
      last_name,
      email,
      phone_number,
      password,
      active: true,
    });
    // const token = generateToken({ userId: user._id });
    const refreshToken = generateRefreshToken({ userId: user._id });
    user.refresh_token = refreshToken!;
    await user.save();

    if (user) {
      res.cookie("refresh_token", refreshToken, COOKIES_OPTIONS);
      res.redirect("https://localhost:3000");
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

const refreshTokenController = asyncHandler(async (req, res) => {
  const { signedCookies = {} } = req;
  const { refresh_token: refreshToken } = signedCookies;

  if (refreshToken) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      );

      //@ts-ignore
      const { userId } = payload;
      const user = await User.findById(userId);

      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized, invalid refresh token" });
      } else {
        if (user.refresh_token !== refreshToken) {
          return res
            .status(401)
            .json({ message: "Unauthorized, invalid refresh token" });
        }
        const token = generateToken({ userId: user._id });
        const newRefreshToken = generateRefreshToken({ userId: user._id });
        user.refresh_token = newRefreshToken!;
        await user.save();
        res.cookie("refresh_token", newRefreshToken, COOKIES_OPTIONS);
        return res.status(200).json({ token: token });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
});

const getUserDetails = asyncHandler(async (req, res) => {
  const query = req.query;
  let select = Object.keys(query).join(" ");
  if (!/\S/.test(select) || select === null || select === undefined) {
    select = "-password -refresh_token";
  }

  if (!req.user) {
    return res.status(401);
  }
  const user = await User.findById(req.user._id).select(select);
  try {
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

const logout = asyncHandler(async (req, res) => {
  try {
    const { signedCookies = {} } = req;
    const { refresh_token: refreshToken } = signedCookies;

    if (!req.user) {
      return res.status(401);
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (user.refresh_token !== refreshToken) {
      return res.status(401);
    }
    user.refresh_token = "";
    await user.save();
    res.clearCookie("refresh_token", COOKIES_OPTIONS);
    res.status(200).json({ message: "success logout" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

const updateEmail = asyncHandler(async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401);
  }
  try {
    const { email, password } = req.body;
    const exist = await User.findOne({ email: email });
    if (exist) {
      return res
        .status(400)
        .json({ message: "there is an account with this email" });
    }

    const currentUser = await User.findById(user._id);
    if (!currentUser) {
      return res.status(404);
    }

    // @ts-ignore
    if (!(await currentUser.matchPassword(password))) {
      return res.status(401).json({ message: "wrong password" });
    }

    currentUser.email = email;
    await currentUser.save();
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401);
  }
  try {
    const { currentPassword, newPassword } = req.body;

    const currentUser = await User.findById(user._id);
    if (!currentUser) {
      return res.status(404);
    }
    // @ts-ignore
    if (!(await currentUser.matchPassword(currentPassword))) {
      return res.status(401).json({ message: "wrong password" });
    }

    currentUser.password = newPassword;
    await currentUser.save();
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

export {
  login,
  registerUser,
  logout,
  refreshTokenController,
  getUserDetails,
  updateEmail,
  updatePassword
};
