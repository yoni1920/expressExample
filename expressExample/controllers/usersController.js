const express = require('express');
const router = express.Router();
const { authUser } = require('../middlewares/auth');
const usersService = require('../services/usersService');

router.get('/me', authUser, (req, res) => {
    usersService.getSelf(req, res);
});

router.get('/contacts', authUser, (req, res) => {
    usersService.getContacts(req, res);
});

router.post('/login', (req, res) => {
    usersService.login(req, res);
});

router.post('/register', (req, res) => {
    usersService.registerUser(req, res);
});

module.exports = router;
