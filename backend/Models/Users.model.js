const mongoose = require('mongoose');

const usersModel = mongoose.Schema({
  userName:{
    type: String,
    required: true,
    minlength: 3,
  },
  userEmail:{
    type: String,
    required: true,
    unique: true,
  },
  userPassword:{
    type: String,
    required: true,
    minlength: 8,
    select: false, // hide the password field in the response
  }
});

const users = mongoose.model('users', usersModel);
module.exports = usersModel