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
      return Party.create(parties)
        .then((createdParties) => createdParties.forEach(party => console.log(party)))
    })
    .then(() => {
      parties.forEach(party => {
        new Party({
          ...party,
          price: Math.floor(Math.random() * 100 + 10),
          capacity: Math.floor(Math.random() * 100 + 10),
        }).save()
          .then(rest => console.log(`${rest.name} has been created!`))
          .catch(err => console.error(err))
      })
    })
    .catch(err => console.error('mongoose', err))
})