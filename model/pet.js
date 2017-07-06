'use strict';

const mongoose = require('mongoose');

const petSchema = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  photoURI: {type: String, required: true, minlength: 1},
  name: {type: String, required: true, minlength: 1},
  type: {type: String, required: true, minlength: 1},
});

module.exports = mongoose.model('pet', petSchema);
