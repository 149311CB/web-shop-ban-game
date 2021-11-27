import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // @ts-ignore
  if (user && (await user.matchPassword(password))) {
    res.json({
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token: generateToken({ userId: user._id }),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
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
    return res.status(401).json({ message: "password not match confirmation" });
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

  if (user) {
    res.status(201).json({
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token: generateToken({ userId: user._id }),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export { authUser, registerUser };
