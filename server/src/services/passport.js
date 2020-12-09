const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const config = require("config");
const mongoose = require("mongoose");
const googleClientID = config.get("GoogleOAuth20.clientID");
const googleClientSecret = config.get("GoogleOAuth20.clientSecret");

const User = mongoose.model("users");

require("../serializers/user")(passport, User);

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log("access token", accessToken);
      // console.log("refresh token", refreshToken);
      // console.log("profile:", profile);
      User.findOne({ googleID: profile.id }).then((existingUser) => {
        /** if user exists then our promise will return the user
            else it will return null
            this is an asynchronous request **/
        if (existingUser) {
          // user with that googleID exists therefore we do not need to create one
          done(null, existingUser);
        } else {
          // since user does not exist then we create the user
          new User({
            googleID: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            imageURL: profile.photos[0].value,
          })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
