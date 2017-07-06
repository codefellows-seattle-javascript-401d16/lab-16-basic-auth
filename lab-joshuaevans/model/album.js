'use strict';

const mongoose = require('mongoose');

const albumSchema = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  name: {type: String, required: true, minlength: 1},
  artist: {type: String, required: true, minlength: 1},
  coverURI: {type: String, required: true, minlength: 1},
});

module.exports = mongoose.model('album', albumSchema);
