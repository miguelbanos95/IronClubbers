const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const partySchema = new Schema({

  name: {
    type: String,
    required: [true, "Name is required"]
  },
  venueType: {
    type: String,
  },
  eventType:{
    type: [String],
    enum: ['music', 'drinks', 'show', 'water', 'dance']
  },
  place: {
    type: String,
    required: [true, "Place is required"]
  },
  address: {
    type: String,
    require: [true, "Address is required"]
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
  ticketTime: {
    type: String,
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
    minlength: [10, 'Please enter at least 10 characters ']
  },
  musicTypes: {
    type: [String],
    default: ["Techno"]
  },
  price:{
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: [true, 'What about capaciy, does not mean anuthing for you?']
  },
  djs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Dj"
  }
}, { timestamps: true })


const Party = mongoose.model('Party', partySchema)
module.exports = Party

