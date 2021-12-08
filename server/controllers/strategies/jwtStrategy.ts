import passport from "passport";
import jwt from "jsonwebtoken";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import User from "../../models/userModel";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const emailOpts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromUrlQueryParameter("token"),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.userId).select(
        "-password -refresh_token -__v"
      );
      if (user) {
        return done(null, user);
      }
      return done(null, false, { message: "user not found" });
    } catch (error: any) {
      return done(null, false, { message: error.message });
    }
  })
);

passport.use(
  "jwt_email_verification",
  new Strategy(emailOpts, async (jwt_payload, done) => {
    try {
      const { userId, ...rest } = jwt_payload;
      console.log(userId);
      const user = await User.findById(userId);
      console.log(user);
      if (user) {
        if (!user.email_verification) {
          return done(null, user, { ...rest });
        } else {
          return done(null, false, { message: "email has been verified" });
        }
      }
      return done(null, false, { message: "user not found" });
    } catch (error: any) {
      return done(null, false, { message: error.message });
    }
  })
);

export const verifyUser = passport.authenticate("jwt", { session: false });
export const verifyEmailToken = passport.authenticate(
  "jwt_email_verification",
  {
    session: false,
  }
);

// passport.serializeUser((user, done) => done(null, user._id));
// passport.deserializeUser(async (_id, done) => {
//   const user = await User.findById(_id).select("-password");
//   return done(null, user);
// });
