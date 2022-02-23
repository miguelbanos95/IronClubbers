const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const partySchema = new Schema({
    
    name: {
        type: String,
        required: [true, "Este campo es obligatorio"]
    },
    address: {
        type: String,
        require:[true, "Este campo es obligatorio"]
    },
    date: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.deviantart.com%2Fdonjas%2Fart%2FParty-People-215748549&psig=AOvVaw2IjpmC600t25AODVn0CMwU&ust=1645553982281000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPDS4Lm0kfYCFQAAAAAdAAAAABAJ",
      },
      description: {
        type: String,
        minlength: [10, 'este campo necesita al menos 10 caracteres ']
      },
      musicTypes: {
        type: [String],
        default: ["Techno"]
      },
      capacity: {
        type: Number,
        required: [true, 'Introduzca un número entre 0 y 9999999' ]
      }
    }, { timestamps: true })

    const Party = mongoose.model('party', partySchema)
    module.exports = Party

