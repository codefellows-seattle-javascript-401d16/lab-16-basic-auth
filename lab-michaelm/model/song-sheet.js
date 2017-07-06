'use strict';

const mongoose = require('mongoose');

const songSheetSchema = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  title: {type: String, required: true, minlength: 1},
  content: {type: String, required: true, minlength: 1},
  profilePictureURI: {type: String, required: true, minlength: 1},
});

module.exports = mongoose.model('song-sheet', songSheetSchema);
