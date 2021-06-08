/* eslint-disable no-underscore-dangle */
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

/**
 * @param req
 * @returns {Authenticator}
 */
module.exports = (req = {}) => {
  // passport.serializeUser(function (user, done) {
  //   done(null, user);
  // });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  return passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    (accessToken, refreshToken, profile, done) => {
      return done({profile, accessToken});
    }
  ));
};
