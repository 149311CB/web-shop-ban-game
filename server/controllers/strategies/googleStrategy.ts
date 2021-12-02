import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import User from "../../models/userModel";

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/users/login/google/callback",
    },
    async (_, __, profile, cb) => {
      const user = await User.findOne({ google_id: profile.id });
      if (!user) {
        const user = await User.create({
          first_name: profile.name?.givenName,
          last_name: profile.name?.familyName,
          email: profile.emails![0].value,
          phone_number: "",
          password: "",
          birthday: null,
          google_id: profile.id,
          avatar: profile.photos![0].value,
        });
        return cb(null, user);
      } else {
        return cb(null, user);
      }
    }
  )
);
