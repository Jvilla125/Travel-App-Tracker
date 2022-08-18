const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const User = require('../models/user');

// configuring Passport!
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
},
  async function (accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    // refer to the lesson plan from earlier today in order to set this up
    const user = await User.findOne({ googleId: profile.id });
    if (user) return cb(null, user);
    try {
      const newUser = await User.create({
        googleId: profile.id,
        email: profile.emails[0].value
      })
      return cb(null, newUser)

    } catch (err) {
      return cb(err)
    }
  }
));

passport.serializeUser(function (user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function (userId, cb) {
  User.findById(userId, function (err, userDocument) {
    if (err) return cb(err);
    cb(null, userDocument);
  });

  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user

});



