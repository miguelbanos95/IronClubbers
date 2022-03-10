const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Comment = require('./comment.model')

const partySchema = new Schema({
  name: {
    type: String,
    required: [true, "Introduzca el nombre"]
  },
  tags: {
    type: [String],
    minlength: [3, 'Min. 3 caracteres']
    
  },
  place: {
    type: String,
    required: [true, "Introduzca el lugar"]
  },
  address: {
    type: String,
    required: [true, "Introduzca la ubicación"]
  },
  start: {
    type: String,
    required: [true, "Introduzca la hora de entrada del evento"]
  },
  end: {
    type: String,
    required: [true, "Introduzca la hora de cierre del evento"]
  },
  ticketTime: {
    type: String,
   required:[true, "Introduzca la hora de cierre del evento"]
  },
  date: {
    type: Date,
    required: [true, "Introduzca la fecha del evento"]
  },
  image: {
    type: String,
    default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.deviantart.com%2Fdonjas%2Fart%2FParty-People-215748549&psig=AOvVaw2IjpmC600t25AODVn0CMwU&ust=1645553982281000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPDS4Lm0kfYCFQAAAAAdAAAAABAJ",
  },
  description: {
    type: String,
    minlength: [10, 'Introduce min. 10 caracteres']
  },
  musicTypes: {
    type: [String],
    default: ["techno"]
  },
  price:{
    type: Number,
    required: [true, "Introduzca el precio"],
    validate: {
     validator: (value) => {
       return typeof(value) !== Number
     },
     message: "Tiene que ser un número"
    }
  },
  capacity: {
    type: Number,
    required: [true, 'Introduzca el número de asistentes']
  },
  djs: {
    type: [String]
  },
  rating: {
    type: Number
  }
}, { 
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      delete ret.social;
      return ret;
    }
  } ,
  toObject: {
    virtuals: true
  }
})

partySchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'party',
  justOne: false,
})

partySchema.virtual('comments', {
  ref: 'Comment', 
  localField: '_id', 
  foreignField: 'party', 
  justOne: false,
 });

const Party = mongoose.model('Party', partySchema)
module.exports = Party

