/* eslint-disable no-underscore-dangle */
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

/**
 * Configuracion FACEBOOK ==> https://i.imgur.com/rSCWFoC.png
 * @param req
 * @returns {Authenticator}
 */
return passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

  // User.findOne({id: jwt_payload.sub}, function (err, user) {
  //   if (err) {
  //     return done(err, false);
  //   }
  //   if (user) {
  //     return done(null, user);
  //   } else {
  //     return done(null, false);
  //     // or you could create a new account
  //   }
  // });

  return done(null, {});


}));
