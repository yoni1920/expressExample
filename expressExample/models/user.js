const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
}

const userSchema = new mongoose.Schema({
    name: requiredString,
    email: requiredString,
    password: requiredString,
    avatar: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;


