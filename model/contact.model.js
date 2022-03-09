const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const partySchema = new Schema({
    name: {
        type: String,
        required: 'este campo es obligatorio',

    },
    email: {
        type: String,
        required: 'este campo es obligatorio',
        unique: true
    },
    issue: {
        type: String,
        required: 'este campo es obligatorio',
        unique: true
    },
    help: {
        type: [String],
        default: ["..."]
    },
    description: {
        type: String,
        minlength: [10, 'Introduce min. 10 caracteres']
    },
    image: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.deviantart.com%2Fdonjas%2Fart%2FParty-People-215748549&psig=AOvVaw2IjpmC600t25AODVn0CMwU&ust=1645553982281000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPDS4Lm0kfYCFQAAAAAdAAAAABAJ",
    },
})
const Contact = mongoose.model('Contact', partySchema)
module.exports = Contact