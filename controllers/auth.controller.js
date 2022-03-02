const mongoose = require('mongoose')
const User = require('../model/user.model')
const passport = require('passport')

module.exports.register = (req, res, next) => {
  res.render('auth/register')
}

module.exports.doRegister = (req, res, next) => {
  const user = req.body;

  const renderWithErrors = (errors) => {
    res.render('auth/register', { errors, user })
  }

  User.findOne({ email: user.email })
    .then((userFound) => {
      if (userFound) {
        renderWithErrors({ email: 'Email ya creado' })
      } else {
        if (req.file) {
          user.image = req.file.path
        }
        return User.create(user)
          .then((createdUser) => {
            mailer.sendActivationEmail(createdUser.email, createdUser.activationToken)
            res.redirect('/login')
          })

      }
    })
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        renderWithErrors(err.errors)
      } else {
        next(err)
      }
    })
}

// module.exports.activate = (req, res, next) => {
//   const activationToken = req.params.token;

//   User.findOneAndUpdate(
//     { activationToken, active: false },
//     { active: true }
//   )
//     .then(() => {
//       res.redirect('/login')
//     })
//     .catch(err => next(err))
// }

const login = (req, res, next, provider) => {
  passport.authenticate(provider || 'local-auth', (err, user, validations) => {
    if (err) {
      next(err)
    } else if (!user) {
      res.status(404).render('auth/login', { errors: { email: validations.error } })
    } else {
      req.login(user, (loginError) => {
        if (loginError) {
          next(loginError)
        } else {
          res.redirect('/parties')
        }
      })
    }
  })(req, res, next)
}

module.exports.login = (req, res, next) => {
  res.render('auth/login')
}

module.exports.doLogin = (req, res, next) => {
  login(req, res, next)
}

module.exports.doLoginGoogle = (req, res, next) => {
  login(req, res, next, 'google-auth')
}

module.exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/login');
}

