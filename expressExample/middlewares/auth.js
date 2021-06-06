const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secretTokenString = require('../auth/authSecret');

const authUser = async (req, res, next) => {
	try {
		const token = req.header('Authorization').split(' ')[1];
		const payload = jwt.verify(token, `${secretTokenString}`);
		const user = await User.findById(payload._id);
		
		if (!user) {
			throw new Error('The user is not authenticated');
		}
		req.user = user;
		next();
	} catch (e) {
		res.status(401).send({ error: 'User is unauthorized' });
	}
};

module.exports = {
	authUser
};
