'use strict';

const mongoose = require('mongoose');

const gifSchema = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, required:true},
  title: {type:String, required: true, minlength:1},
  description: {type:String, required: true, minlength:1},
  category: {type:String, required: true, minlength:1},
  gifURI: {type:String, required: true, minlength:1},
});

module.exports = mongoose.model('gif',gifSchema);
