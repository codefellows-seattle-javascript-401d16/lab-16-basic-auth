'use strict';

const mongoose = require('mongoose');

const profilepicSchema = mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true, minlength: 1 },
  date: { type: Date, required: true },
  photoURI: { type: String, required: true, minlength: 1 }
});

module.exports = mongoose.model('profilepic', profilepicSchema);
