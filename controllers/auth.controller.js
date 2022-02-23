// const User = require('../models/User.model')
const mongoose = require('mongoose')



module.exports.register = (req, res, next) => {
    res.render('auth/register')
}


