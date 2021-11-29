import passport from "passport";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import User from "../../models/userModel";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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

export const verifyUser = passport.authenticate("jwt", { session: false });

// passport.serializeUser((user, done) => done(null, user._id));
// passport.deserializeUser(async (_id, done) => {
//   const user = await User.findById(_id).select("-password");
//   return done(null, user);
// });
