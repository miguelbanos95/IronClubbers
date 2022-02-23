const express = require('express');
const router = express.Router();
const common = require('../controllers/common.controller')

/**
 * COMMON ROUTES
 */
router.get('/', common.home)
/**
 * AUTH ROUTES 
 */

module.exports = router