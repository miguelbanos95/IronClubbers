const Party = require("../model/party.model");

module.exports.isAuthenticated = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/register')
    }
}
  
module.exports.isNotAuthenticated = (req, res, next) => {
    if (!req.user) {
      next();
    } else {
      res.redirect('/profile')
    }
}













module.exports.isUser = (req, res, next) => {
  if (req.user && req.user.id === req.params.userId ) {
   
    next();
  } else {
    res.render('common/home')
  }
}


module.exports.isManager = (req, res, next) => {
  if (req.user && req.user.manager === "yes"){
    Party.findOne({managerId:req.user.id})
    .then((party) => {
      
        if (party.id  === req.params.partyId){
          next();
        } else {
          res.render('common/home')
        }
    })
    .catch(error => {
      res.render('common/control')
    });
  } 
  else {
    res.render('common/control')
  }
}

