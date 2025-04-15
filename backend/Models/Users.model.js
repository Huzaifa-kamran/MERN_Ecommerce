const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
    userRole:{
        type: String,
        default: 'customer',
    },
    userImage: {
        type: String,
    },
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;