const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
// const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../model/user.model');

passport.serializeUser((user, next) => {
  next(null, user.id)
})

passport.deserializeUser((id, next) => {
  User.findById(id)
    .then(user => {
      next(null, user)
    })
    .catch(err => next(err))
})

passport.use('local-auth', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, next) => {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          next(null, false, { error: 'Campo email o contraseña inválidos' })
        } else {
          return user.checkPassword(password)
            .then((match) => {
              if (!match) {
                next(null, false, { error: 'Campo email o contraseña inválidos' })
              } else {
                if (user.active) {
                  next(null, user)
                } else {
                  next(null, false, { error: "Cuenta ya registrada" })
                }
              }
            })
        }
      })
      .catch(err => next(err))
  }
))

passport.use('google-auth', new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, next) => {
    

    const googleID = profile.id;
    const email = profile.emails[0] ? profile.emails[0].value : undefined;
    const name = profile.displayName;
    console.log()
    if (googleID && email) {
      User.findOne({
        $or: [
          { googleID },
          { email }
        ]
      })
        .then((user) => {
          if (user) {
            next(null, user)
          } else {
            User.create({
              email,
              googleID,
              password: mongoose.Types.ObjectId(),
              name,
              image: profile.photos[0].value
            })
            .then(createdUser => {
              next(null, createdUser)
            })
          }
        })
        .catch(err => next(err))
    } else {
      next(null, false, { error: 'Error connecting to Google Auth' })
    }
  }
))

// passport.use('twitter-auth',new TwitterStrategy({
//   consumerKey: process.env.TWITTER_CONSUMER_KEY,
//   consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
//   callbackURL: "auth/twitter/callback"
// },
// function(token, tokenSecret, profile, cb) {
//   console.log('entro')
//   User.findOrCreate({ twitterId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }
// ));

