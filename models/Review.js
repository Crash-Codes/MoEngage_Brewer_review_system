const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  breweryId: String,
  rating: Number,
  description: String,
});
module.exports = mongoose.model('Review', ReviewSchema);
