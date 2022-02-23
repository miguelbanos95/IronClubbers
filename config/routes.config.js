const express = require('express');
const router = express.Router();
const common = require('../controllers/common.controller')
const parties = require('../controllers/party.controller');


/**
 * COMMON ROUTES
 */
router.get('/', parties.list)
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

module.exports = router