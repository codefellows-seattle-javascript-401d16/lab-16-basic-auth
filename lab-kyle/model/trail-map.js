'use strict';

const mongoose = require('mongoose');

const trailMapSchema = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  name: {type: String, required: true, minLength: 1},
  description: {type: String, required: true, minLength: 1},
  mapURI: {type: String, required: true, minLength: 1},
});

module.exports = mongoose.model('trailMap', trailMapSchema);
