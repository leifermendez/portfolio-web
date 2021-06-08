/* eslint-disable no-underscore-dangle */
const passport = require('passport')
const YoutubeV3Strategy = require('passport-youtube-v3').Strategy

/**
 * Configuracion FACEBOOK ==> https://i.imgur.com/rSCWFoC.png
 * @param req
 * @returns {Authenticator}
 */
module.exports = (req = {}) => {
  // const { cookies } = req
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
  return passport.use(new YoutubeV3Strategy({
      clientID: process.env.YOUTUBE_ID,
      clientSecret: process.env.YOUTUBE_SECRET,
      callbackURL: process.env.YOUTUBE_CALLBACK,
      scope: ['https://www.googleapis.com/auth/youtube.readonly','https://www.googleapis.com/auth/userinfo.email']
    },
    (accessToken, refreshToken, profile, done) => {
      return done({profile, accessToken});
    }
  ));
};
