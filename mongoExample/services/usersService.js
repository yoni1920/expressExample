const { findUserToLogin, generateToken } = require('../auth/auth');
const User = require('../models/user');
const userRepository = require('../repositories/usersRepository');
const { defaultUser } = require('../images/defaultImages');

exports.getSelf = (req, res) => {
    const { name, avatar } = req.user;

    res.send({ name, avatar });
}

const sendUserTokenInfo = (res, user) => {
    const token = generateToken(user._id.toString());

    const { name, avatar } = user;

    res.send({
        user: { name, avatar },
        token   
    });    
}

exports.login = async (req, res) => {
    try {
		const user = await findUserToLogin(req.body);

		if (user) {
            sendUserTokenInfo(res, user);

		} else {
			res.status(404).send('Unable to login');
		}
	} catch (error) {
		res.status(400).send(error);
	}
}

exports.getContacts = async (req, res) => {
    try {
        const userContacts = await userRepository.allContacts(req.user.email);
        
        res.send(userContacts);
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.registerUser = async (req, res) => {
    try {
        let { email, password, name, avatar } = req.body;

        const isUniqueEmail = await userRepository.isUniqueEmail(email); 

        if (isUniqueEmail) {

            if (!avatar) {
                avatar = defaultUser
            }
    
            const userToRegister = {
                name,
                email,
                password,
                avatar
            }

            await User.create(userToRegister);

            const user = await findUserToLogin(userToRegister);        
            sendUserTokenInfo(res, user);
        } else {
            res.status(409).send("Email already exists!");
        }  
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}