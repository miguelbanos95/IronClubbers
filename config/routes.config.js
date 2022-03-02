const express = require('express');
const router = express.Router();
const common = require('../controllers/common.controller')
const parties = require('../controllers/party.controller');
const auth = require('../controllers/auth.controller');


/**
 * COMMON ROUTES
 */
router.get('/', parties.list) //***modificar***
router.get('/register',)
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

module.exports = router