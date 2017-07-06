'use strict';

const mongoose = require('mongoose');

const heroSchema = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  title: {type: String, required: true},
  imageURI: {type:String, required: true},
});

module.exports = mongoose.model('hero', heroSchema);
