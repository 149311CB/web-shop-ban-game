import sendgrid from "@sendgrid/mail";
import asyncHandler from "express-async-handler";
import { generateToken } from "../utils/generateToken";

export const sendVerificationEmail = asyncHandler(
  async (req, res, next): Promise<any> => {
    const { register } = req;
    if (!register || register === undefined) {
      return next();
    }
    const { user } = req;
    if (!user) {
      return res
        .status(500)
        .json({ message: "there is an error when create your account" });
    }
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);
    const registerToken = generateToken({ userId: user._id, register: true });
    const msg = {
      to: user.email,
      from: "xstk2000@gmail.com",
      subject: "Verify your email",
      templateId: "d-6dc798c7de9a43fdbb52548b6c498203",
      dynamicTemplateData: {
        link: `https://web-shop-ban-game.herokuapp.com/api/users/email/verify?token=${registerToken}`,
      },
    };
    sendgrid
      .send(msg)
      .then(() => {
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  }
);
