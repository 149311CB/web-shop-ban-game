import asyncHandler from "express-async-handler";
import sendgrid from "@sendgrid/mail";
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
      console.log({refreshToken});
      await exist.save();
      res.cookie("refresh_token", refreshToken, COOKIES_OPTIONS);
      if (req.register) {
        return res.redirect("https://duties-designing-garcia-periodically.trycloudflare.com/auth/complete");
      }
      return res.redirect("https://duties-designing-garcia-periodically.trycloudflare.com");
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
const registerUser = asyncHandler(async (req, res, next) => {
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
    if (!password || password === undefined) {
      return res.status(400).json({ message: "required password" });
    }

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

    const user = {
      first_name,
      middle_name: "",
      birthday,
      last_name,
      email,
      phone_number,
      password,
      active: true,
      email_verification: false,
    };

    const newUser = await User.create(user);
    req.register = true;
    req.user = newUser;

    return next();
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

const createCredential = asyncHandler(async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401);
  }
  const exist = await User.findById(user._id);
  if (!exist) {
    return res.status(401);
  }
  const refreshToken = generateRefreshToken({ userId: exist._id });
  exist.refresh_token = refreshToken!;
  await exist.save();

  res.cookie("refresh_token", refreshToken, COOKIES_OPTIONS);
  res.status(201).json({ message: "successful" });
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

const verifyEmail = asyncHandler(async (req, res) => {
  const { user, authInfo } = req;
  if (!user) {
    return res.status(401);
  }

  const exist = await User.findById(user._id);
  if (!exist) {
    return res.status(401);
  }
  // Redirect to create password page if no password found and is register
  if (
    exist.password === "" ||
      !exist.password
  ) {
    // Generate short live token to create password
    const emailVerificationToken = generateToken({
      userId: user._id,
      noPass: true,
      isRegistered: true,
    });
    exist.email_verification = true;
    await exist.save();

    // res.cookie("email_verification_token", emailVerificationToken, {
    //   ...COOKIES_OPTIONS,
    //   maxAge: eval(process.env.SESSION_EXPIRY!),
    // });

    res.redirect(
      `https://149311cb.tech/verification/create-pass?token=${emailVerificationToken}`
    );
  } else if (exist.password && authInfo?.register) {
    // Generate rf token and redirect to homepage if password found and is register
    const refreshToken = generateRefreshToken({ userId: user._id });
    exist.refresh_token = refreshToken;
    exist.email_verification = true;
    await exist.save();
    res.cookie("refresh_token", refreshToken, COOKIES_OPTIONS);
    return res.redirect("https://149311cb.tech");
  } else if (authInfo?.register) {
    return res.redirect("https://149311cb.tech");
  }
});

const createPassword = asyncHandler(async (req, res) => {
  const { password, confirm_pass } = req.body;
  const { token: emailVerificationToken } = req.query;
  if (!emailVerificationToken || typeof emailVerificationToken !== "string") {
    return res.status(401).json({ message: "token failed" });
  }
  if (
    !password ||
    !confirm_pass ||
    typeof password !== "string" ||
    typeof confirm_pass !== "string"
  ) {
    return res.status(400).json({ message: "invalid password" });
  }
  // const { signedCookies = {} } = req;
  // const { email_verification_token: emailVerificationToken } = signedCookies;
  const decoded = jwt.verify(emailVerificationToken, process.env.JWT_SECRET!);
  if (typeof decoded === "string") {
    return res.status(401).json({ message: "token failed" });
  }
  const { userId, noPass } = decoded;
  if (!noPass) {
    return res.status(200).json({ message: "password is created already" });
  }
  const exist = await User.findById({
    _id: userId,
    email_verification: false,
  });

  if (!exist) {
    return res.status(200).json({ message: "email has been verified" });
  }

  try {
    const refreshToken = generateRefreshToken({ userId: exist._id });
    exist.refresh_token = refreshToken!;
    exist.password = password;
    await exist.save();
    res.cookie("refresh_token", refreshToken, COOKIES_OPTIONS);
    // res.clearCookie("email_verification_token", {
    //   COOKIES_OPTIONS,
    //   maxAge: eval(process.env.SESSION_EXPIRY!),
    // });
    return res.status(201).json({ message: "successful" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

const updatePersonalDetails = asyncHandler(async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401);
  }
  try {
    const { firstName, lastName, phoneNumber, birthday, password } = req.body;
    const exist = await User.findById(user._id);
    // @ts-ignore
    if (!exist || !(await user.matchPassword(password))) {
      return res.status(401);
    }
    exist.first_name = firstName;
    exist.last_name = lastName;
    exist.phone_number = phoneNumber;
    exist.birthday = new Date(birthday).toISOString();
    await exist.save();
    return res.status(200).json({ message: "successful" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

const getAllUser = asyncHandler(async (_, res) => {
  const users = await User.find({});
  return res.status(200).json(users);
});

const resetPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const exist = await User.findOne({ email: email });
  if (!exist) {
    return res.status(200).json({ message: "user not found" });
  }
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);
  const resetPassToken = generateToken({ userId: exist._id, resetPass: true });
  const msg = {
    to: exist.email,
    from: "xstk2000@gmail.com",
    subject: "Reset password",
    templateId: "d-2617efa26a114566a2de3f66264a7e64",
    dynamicTemplateData: {
      link: `https://149311cb.tech/password/reset?token=${resetPassToken}`,
    },
  };

  await sendgrid.send(msg);

  return res.status(200).json(exist);
});

const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { token } = req.query;
    const { password } = req.body;
    if (!token || typeof token !== "string") {
      return res.redirect("https://149311cb.tech");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded === "string" || !decoded.userId) {
      return res.redirect("https://149311cb.tech");
    }
    const exist = await User.findById(decoded.userId);
    if (!exist) {
      return res.redirect("https://149311cb.tech");
    }
    exist.password = password;
    await exist.save();
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

const getUsers = asyncHandler(async (_, res) => {
    const users = await User.find({})
    res.json(users);
});

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.Id)
    res.json(user);
});


export {
  login,
  registerUser,
  logout,
  refreshTokenController,
  getUserDetails,
  updateEmail,
  updatePassword,
  verifyEmail,
  createPassword,
  createCredential,
  getAllUser,
  updatePersonalDetails,
  resetPasswordRequest,
  resetPassword,
  getUsers,
  getUser
};
