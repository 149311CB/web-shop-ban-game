import passport from "passport";
import { Strategy } from "passport-local";
import User from "../../models/userModel";

const authenticateUser = async (email: string, password: string, done: any) => {
  const user = await User.findOne({ email: email });
  if (user === null) {
    return done(null, false);
  }
  try {
    // @ts-ignore
    if (await user.matchPassword(password)) {
      return done(null, user);
    } else {
      return done(null, false, {
        message: "Email and password combination does not match any record",
      });
    }
  } catch (error) {
    return done(error);
  }
};

passport.use(new Strategy({ usernameField: "email" }, authenticateUser));
passport.serializeUser((user, done) => done(null, user._id));
// passport.deserializeUser(async (_id, done) => {
//   const user = await User.findById(_id).select("-password")
//   return done(null, user);
// });
