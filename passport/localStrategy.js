const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/user');
const bcrypt        = require('bcrypt');
const SlackStrategy = require('passport-slack').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, 
  (username, password, done) => {
    User.findOne({ username })
    .then(foundUser => {
      if (!foundUser) {
        done(null, false, { message: 'Incorrect username' });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        done(null, false, { message: 'Incorrect password' });
        return;
      }

      done(null, foundUser);
    })
    .catch(err => done(err));
  }
));

passport.use(new SlackStrategy({
  clientID: process.env.SLACK_ID,
  clientSecret: process.env.SLACK_SECRET
}, (accessToken, refreshToken, profile, done) => {
  // optionally persist profile data
  done(null, profile);
}
));
