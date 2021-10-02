const express = require('express');
const router = express.Router();
const { authUser } = require('../middlewares/auth');
const chatsService = require('../services/chatsService');

router.use(authUser);

router.get('/me', (req, res) => {
    chatsService.getChats(req, res);
});

router.post('/message/:chatId', (req, res) => {
    chatsService.postNewMessage(req, res);
});

router.post('/', (req, res) => {
    chatsService.createNewChat(req, res);
});

router.patch('/readby/:chatId', (req, res) => {
    chatsService.readNewMessages(req, res);
});

// Extra
router.delete('/:chatId', async (req, res) => {

});

router.delete('/leave/:chatId', async (req, res) => {

});

module.exports = router;
