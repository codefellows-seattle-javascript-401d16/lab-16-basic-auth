'use strict';

const mongoose = require('mongoose');

const pdfSchema = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  title: {type: String, required: true, minlength: 1},
  tag: {type: String, minlength: 1},
  pdfURI: {type: String, required: true, minlength: 1},
});

module.exports = mongoose.model('pdf', pdfSchema);
