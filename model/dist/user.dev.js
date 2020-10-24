"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  creationDate: {
    type: Date,
    "default": Date.now()
  }
});
module.exports = mongoose.model("User", userSchema);