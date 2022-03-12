const mongoose = require('mongoose');
const Party = require('../model/party.model');
const musicTypes = Object.keys(require('../data/musicTypes.json'));
const Comment = require('../model/comment.model')
const Payment = require("../model/payment.model");



module.exports.list = (req, res, next) => {

  Party.find()
    .populate('likes')
    .sort({ createdAt: 'desc' })
    .then((parties) => {
      console.log({parties});
      res.render('common/home', { parties })
    })
    .catch((error) => next(error));
};

module.exports.results = (req, res, next) => {
  const { name, musicTypes } = req.query
  const criteria = {};

  if (name) {
    criteria.name = new RegExp(name, 'i')
  }

  if (musicTypes) {
    criteria.musicTypes = {
      $all: musicTypes.split(',')
    }
  }

  Party.find(criteria)
    .populate('likes')
    .then(parties =>
      res.render('parties/results', {
        parties,
        musicTypes,
        name
      })
    ).catch(error => next(error));
}



module.exports.detail = (req, res, next) => {
  Party.findById(req.params.id)
  .populate({ path: 'comments', populate: 'user' })
    .then((party) => {
      if (party) {
        console.log({party})
        res.render('parties/details', { party });
      } else {
        res.redirect('/parties');
      }
    })
    .catch(error => next(error));
  return 5
};

module.exports.create = (req, res, next) => {
  res.render('parties/create', {
    musicTypes: musicTypes
  });
};

module.exports.doCreate = (req, res, next) => {
  let partyTypeMusic = req.body.musicTypes;
  if (partyTypeMusic && !Array.isArray(partyTypeMusic)) {
    partyTypeMusic = [partyTypeMusic]
  }

  const party = new Party({
    name: req.body.name,
    place: req.body.place,
    address: req.body.address,
    start: req.body.start,
    end: req.body.end,
    date: req.body.date,
    ticketTime: req.body.ticketTime,
    description: req.body.description,
    musicTypes: partyTypeMusic,
    tags: req.body.tags.split(',').slice(0, 4),
    capacity: req.body.capacity,
    price: req.body.price,
    djs: req.body.djs?.split(',')
  });
  
  if(req.file){
    party.image = req.file.path
  }

  party
    .save()
    .then(() => res.redirect('/parties'))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        console.error(error.errors)
        res.status(400).render('parties/create', {
          errors: error.errors,
          party,
          musicTypes: musicTypes
        });
      } else {
        console.error(error)
        next(error);
      }
    });
};

module.exports.edit = (req, res, next) => {

  Party.findById(req.params.id)
    .then((party) => {
      res.render('parties/edit', {
        party,
        musicTypes: musicTypes
      });
    })
    .catch(next)

};

module.exports.doEdit = (req, res, next) => {
  Party.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
    .then((party) => res.redirect(`/parties/${party.id}`))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        req.body.id = req.params.id;
        res.status(400).render('parties/edit', {
          errors: error.errors,
          party: req.body,
          musicTypes: musicTypes,
        });
      } else {
        next(error);
      }
    });
};

module.exports.delete = (req, res, next) => {
  Party.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/parties'))
    .catch(error => next(error));
};




module.exports.payment = (req, res, next) => {
  Party.findById(req.params.id)
    // .populate('user')
    .then(parties => {
      if (parties) {
        res.render('parties/payment', {
          parties
        })
      }
    })
    .catch(error => next(error));
}