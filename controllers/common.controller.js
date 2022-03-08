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
module