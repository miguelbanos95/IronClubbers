require('dotenv').config();

const mongoose = require('mongoose')
const parties = require('../data/parties.json')
const Party = require('../model/party.model')

require('../config/db.config');

mongoose.connection.once('open', () => {
  console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);

  mongoose.connection.db
    .dropDatabase()
    .then(() => `O.o! ${mongoose.connection.db.databaseName} dropped!`)
    .then(() => {
      parties.forEach(party => {
        new Party({
          ...party,
          price: Math.floor(Math.random() * 20 + 10),
          capacity: Math.floor(Math.random() * 120 + 100),
        }).save()
          .then(party => console.log(party))
          .catch(err => console.error(err))
      })
    })
    .catch(err => console.error('mongoose', err))
})