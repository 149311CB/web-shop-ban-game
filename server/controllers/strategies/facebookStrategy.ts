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
      passReqToCallback: true,
    },
    async (req, _, __, profile, cb) => {
      const { emails } = profile;
      const email = emails![0];
      const user = await User.findOne({
        $or: [{ facebook_id: profile.id }, { email: email.value }],
      });
      if (!user) {
        const user = await User.create({
          first_name: profile.name!.familyName,
          last_name: profile.name!.givenName,
          email: profile.emails![0].value,
          phone_number: "",
          birthday: null,
          facebook_id: profile.id,
          avatar: profile.photos![0].value,
        });
        req.register = true;
        cb(null, user);
      } else {
        if (user.facebook_id || user.facebook_id === undefined) {
          user.facebook_id = profile.id;
          await user.save();
        }
        cb(null, user);
      }
    }
  )
);
