const express = require('express');
const router = express.Router();
const common = require('../controllers/common.controller')
const parties = require('../controllers/party.controller');
const auth = require('../controllers/auth.controller');
const user = require('../controllers/user.controller')
const passport = require('passport')
const authMiddleware = require('../middlewares/auth.middlewares')
const upload = require('../config/storage.config');



const GOOGLE_SCOPES = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
/**
 * COMMON ROUTES
 */


router.get('/profile', authMiddleware.isAuthenticated, user.profile)

router.get('/', parties.list) //***modificar***
router.get('/terms', common.terms)
router.get('/policy-privacy', common.policyPrivacy)


/**
 * Party Routes
 */
router.get('/parties', parties.list);
router.get('/parties/create', parties.create);
router.get('/parties/:id', parties.detail);
router.post('/parties', parties.doCreate);
router.get('/parties/:id/edit', parties.edit);
router.post('/parties/:id/edit', parties.doEdit);
router.post('/parties/:id/delete', parties.delete);
/**
 * AUTH ROUTES 
 */
router.get('/register', auth.register)
router.get('/register-with-email', auth.registerLocal)
router.post('/register', upload.single('image'), auth.doRegisterLocal)
router.get('/login', auth.login)
router.post('/login', auth.doLogin)
router.get('/logout', auth.logout)

/**
 * AUTH ROUTES GOOGLE
 */
router.get('/login/google', passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }))
router.get('/auth/google/callback', auth.doLoginGoogle)

/**
 * AUTH ROUTES TWITTER
 */
//  router.get('/auth/twitter',
//  passport.authenticate('twitter-auth'));

// router.get('/auth/twitter/callback', 
//  passport.authenticate('twitter', { failureRedirect: '/login' }),
//  function(req, res) {
//      console.log('callback')
//    // Successful authentication, redirect home.
//    res.redirect('/');
//  });


module.exports = router