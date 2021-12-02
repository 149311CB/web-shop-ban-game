import passport from "passport";
import { Strategy } from "passport-facebook";
import User from "../../models/userModel";

passport.use(
  new Strategy(
    {
      clientID: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
      callbackURL: "/api/users/login/facebook/callback",
      profileFields: [
        "id",
        "first_name",
        "last_name",
        "displayName",
        "photos",
        "email",
      ],
    },
    async (_, __, profile, cb) => {
      const user = await User.findOne({ facebook_id: profile.id });
      if (!user) {
        const user = await User.create({
          first_name: profile.name!.familyName,
          last_name: profile.name!.givenName,
          email: profile.emails![0].value,
          phone_number: "",
          password: "",
          birthday: null,
          facebook_id: profile.id,
          avatar: profile.photos![0].value,
        });
        cb(null, user);
      } else {
        cb(null, user);
      }
    }
  )
);
