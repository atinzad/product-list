const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("../config/keys");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    try {
      if (jwtPayload.exp < Date.now()) {
        return done(null, false);
      }
      const user = await User.findById(jwtPayload._id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (error) {
      done(error);
    }
  }
);
