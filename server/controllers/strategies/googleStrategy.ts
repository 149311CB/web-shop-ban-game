import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import User from "../../models/userModel";

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL:
        "https://web-shop-ban-game.herokuapp.com/api/users/login/google/callback",
      passReqToCallback: true,
    },
    async (req, _, __, profile, cb) => {
      const { emails } = profile;
      const email = emails![0];
      const user = await User.findOne({
        $or: [{ google_id: profile.id }, { email: email.value }],
      });
      if (!user) {
        const user = await User.create({
          first_name: profile.name?.givenName,
          last_name: profile.name?.familyName,
          email: profile.emails![0].value,
          phone_number: "",
          birthday: null,
          google_id: profile.id,
          avatar: profile.photos![0].value,
        });
        req.register = true;
        return cb(null, user);
      } else {
        if (user.google_id || user.google_id === undefined) {
          user.google_id = profile.id;
          await user.save();
        }
        return cb(null, user);
      }
    }
  )
);
