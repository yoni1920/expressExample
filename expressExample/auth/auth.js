const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secretTokenString = require('./authSecret');

exports.findUserToLogin = async ({ username, password }) => {
	return await User.findOne({ username, password });
};

exports.generateToken = id =>
	jwt.sign({ _id: id }, `${secretTokenString}`, {
		expiresIn: '7 days'
	});
