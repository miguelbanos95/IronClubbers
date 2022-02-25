const mongoose = require('mongoose')
const User = require('../model/user.model')

module.exports.profile = (req, res, next) => {

    res.render('auth/profile')

}