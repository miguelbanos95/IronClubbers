const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  party: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Party'
  },
  pay: {
    type: Boolean,
    default: false
  },
  metadata: {
    type: String,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Payments', paymentSchema);