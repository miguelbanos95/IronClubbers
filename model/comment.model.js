const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
 user: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User'
 },
 party: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Party'
 },
 comment: {
   type: String,
   required: true,
   required: 'Comment is required'
 },
 rate: {
   type: Number,
 },
}, {
 timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);