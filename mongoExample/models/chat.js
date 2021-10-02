const mongoose = require('mongoose');
const User = require('./user');
const messageSchema = require('./message');

const chatSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    // messages: {
    //     type: Array
    // },
    messages: [messageSchema],
    picture: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    newMessages: {
        type: Number,
        required: false
    }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;


