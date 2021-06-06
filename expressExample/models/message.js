const mongoose = require('mongoose');
const User = require('./user');

const messageSchema = new mongoose.Schema({
    readBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    date: {
        type: Date,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = messageSchema;