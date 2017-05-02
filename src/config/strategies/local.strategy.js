var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

module.exports = function () {
  passport.use(new LocalStrategy({
      usernameField: 'userName',
      passwordField: 'password'
  }, function (username, password, done) {
      //go db, pull user, check data, and go on
      var url = 'mongodb://localhost:27017/libraryApp';
      mongodb.connect(url, function (err, db) {
          var collection = db.collection('users');
          collection.findOne({
              username: username
          }, function (err, results) {
              if(results && results.password === password) {
                  var user = results;
                  done(null, user);
              } else {
                  done(null, false, {message: 'Bad password'});
              }
          });
      });
  }));
};