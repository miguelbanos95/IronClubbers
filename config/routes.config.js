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


router.get('/', parties.list) 
router.get('/terms', common.terms)
router.get('/policy-privacy', common.policyPrivacy)
router.get('/cookies', common.cookies)
router.get('/contact', common.contact)
router.post('/contact', common.doContact)


/**
 * Party Routes
 */
router.get('/parties', parties.list);
router.get('/parties/results', parties.results)
router.get('/parties/create',authMiddleware.isAuthenticated, parties.create);
router.get('/parties/:id', parties.detail);
router.post('/parties', authMiddleware.isAuthenticated, upload.single('image'),  parties.doCreate);
router.get('/parties/:id/edit', authMiddleware.isAuthenticated, parties.edit);
router.post('/parties/:id/edit', authMiddleware.isAuthenticated, upload.single('image'), parties.doEdit);
router.post('/parties/:id/delete', authMiddleware.isAuthenticated, parties.delete);

// router.get('/parties/:id/payment', authMiddleware.isAuthenticated, parties.payment);

router.get('/parties/:id/payment');


// router.get('/parties/:id/comment', authMiddleware.isAuthenticated, parties.comment);
router.post('/parties/:id', authMiddleware.isAuthenticated, parties.doComment)
/**
 * AUTH ROUTES 
 */

router.get('/register', auth.register)
router.get('/login', auth.login)
router.get('/register-with-email', auth.registerLocal)
router.post('/register', upload.single('image'), auth.doRegisterLocal)
router.get('/activate/:token', auth.activate)
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

/* User routes*/
router.get('/favs', authMiddleware.isAuthenticated, user.favList)
router.post('/like/:id', authMiddleware.isAuthenticated, user.doLike)




module.exports = router