const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: 'este campo es obligatorio',
    minLength: [3, 'este campo necesita al menos 3 caracteres']
  },
  email: {
    type: String,
    required: 'este campo es obligatorio',
    match: [EMAIL_PATTERN, 'email no válido'],
    unique: true
  },
  password: {
    type: String,
    required: 'este campo es obligatorio',
    match: [PASSWORD_PATTERN, 'este campo necesita al menos 8 dígitos'],
  },
  googleID: {
    type: String
  },
  image: {
    type: String,
    default: "https://i0.wp.com/alcabodelacalle.es/wp-content/uploads/2021/10/fabrik-humanes.jpg?w=1392&ssl=1"
  },
  twitterID: {
    type: String
  },
  active: {
    type: Boolean,
    default: false
  },
  activationToken: {
    type: String,
    default: () => {
      return Math.random().toString(36).substring(7) +
      Math.random().toString(36).substring(7) +
      Math.random().toString(36).substring(7) +
      Math.random().toString(36).substring(7)
    }
  },
});

userSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
})

userSchema.virtual('comments', {
  ref: 'Comment', 
  localField: '_id', 
  foreignField: 'party', 
  justOne: false,
 });


userSchema.pre('save', function(next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.hash(user.password, SALT_ROUNDS)
      .then((hash) => {
        user.password = hash
        next()
      })
      .catch(err => next(err))
  } else {
    next()
  }
})

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema);

module.exports = User;