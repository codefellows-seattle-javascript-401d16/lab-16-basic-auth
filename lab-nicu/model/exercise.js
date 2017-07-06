'use strict';

const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, required:true},
  exerciseName: {type: String, required: true},
  imageURI: {type: String, required: true},
  muscle: {type: String, required:true},
});

module.exports = mongoose.model('exercise', exerciseSchema);