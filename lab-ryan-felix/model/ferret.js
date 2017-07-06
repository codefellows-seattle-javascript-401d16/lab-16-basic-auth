const mongoose = require('mongoose');

const ferretSchema = mongoose.Schema({
  name: { type: String, required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, required: true },
  photoURI: { type: String },
});

module.exports = mongoose.model('ferret', ferretSchema);
