const User = require('../models/user');

exports.isUniqueEmail = async (userEmail) => {
    return await User.find({
        email: {
            $eq: userEmail
        }
    }).countDocuments() == 0; 
}

exports.allContacts = async (userEmail) => {
    return await User.find({
        email: {
            $ne: userEmail
        }
    })
    .select({ "name": true, "avatar": true});
}
