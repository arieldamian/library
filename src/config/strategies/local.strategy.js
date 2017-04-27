var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function () {
  passport.use(new LocalStrategy({
      usernameField: 'userName',
      passwordField: 'password'
  }, function (username, password, done) {
      //go db, pull user, check data, and go on
      var user = {
          username: username,
          password: password
      };
      done(null, user);
  }));
};