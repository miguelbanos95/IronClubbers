const mongoose = require('mongoose')
const mailer = require('../config/mailer.config')


const { render } = require("express/lib/response")

module.exports.home = (req, res, next) => {
    res.render('common/home')
}
module.exports.terms = (req, res, next) =>{
    res.render('common/terms')
}
module.exports.policyPrivacy = (req, res, next) => {
    res.render('common/policy-privacy')
}
module.exports.cookies = (req, res, next) => {
    res.render('common/cookies')
}
module.exports.contact = (req, res, next) => {
    res.render('common/contact')
}
module.exports.doContact = (req, res, next) => {
    const {email, issue, name} = req.body;
    console.log()
    mailer.issueUser(email, issue, name);
    req.flash('flashMessage', 'true');
    res.redirect('/')
}