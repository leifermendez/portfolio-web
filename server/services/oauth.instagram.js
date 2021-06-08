/* eslint-disable no-underscore-dangle */
const passport = require('passport')
const InstagramStrategy = require('passport-instagram').Strategy;

/**
 * @param req
 * @returns {Authenticator}
 */
module.exports = (req = {}) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  return passport.use(new InstagramStrategy({
      clientID: process.env.INSTAGRAM_ID,
      clientSecret: process.env.INSTAGRAM_SECRET,
      callbackURL: process.env.INSTAGRAM_CALLBACK,
      scope: ['public_profile', 'email'],
    },
    (accessToken, refreshToken, profile, done) => {
      // asynchronous verification, for effect...
      process.nextTick(() => {

        // To keep the example simple, the user's Instagram profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Instagram account with a user record in your database,
        // and return that user instead.
        console.log(profile)
        return done(null, profile);
      });
    }
  ));
};
