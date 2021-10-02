const Chat = require('../models/chat');
const User = require('../models/user');
const chatsRepository = require('../repositories/chatsRepository');
const { ObjectId } = require('mongodb');
const { defaultGroup } = require('../images/defaultImages');

exports.getChats = async (req, res) => {
    try {
        const currentUserId = req.user._id.toString();

        const chats = await chatsRepository.getParticipatingChats(currentUserId);

        const chatsWithNewMessages = retrieveNewMessages(chats, currentUserId);
        const sortedMessages = sortMessages(chatsWithNewMessages);
        const sortedChatRooms = sortChatRooms(sortedMessages);

        res.send(sortedChatRooms);
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.readNewMessages = async (req, res) => {
    try {
        await chatsRepository.updateUnreadMessages(req.params.chatId, req.user._id);

        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.postNewMessage = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const text = req.body.text;
        const userId = req.user._id;

        const sentBy = await User.findById(userId);

        const messageToInsert = {
            readBy: [userId],
            date: new Date(),
            text,
            sentBy
        };

        await chatsRepository.updateChatNewPost(chatId, messageToInsert);

        const chatToSend = await Chat.findById(chatId);

        res.send(chatToSend);
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.createNewChat = async (req, res) => {
    try {

        let { type, participants, picture, name } = req.body;
        let isUniqueGroup = true;

        if (type === "single") {
            const userInfo = await User.findById(participants[0]).select({"avatar": true, "name": true});
            picture = userInfo.avatar;

            if (!name) {
                name = userInfo.name;
            }

            isUniqueGroup = await chatsRepository.isUniqueGroup(userInfo._id);

        } else {
            if (!picture) {
                picture = defaultGroup;
            }
        }

        if (isUniqueGroup) {
            participants = participants.map(userId => ObjectId(userId));
            participants.push(req.user._id);

            const newChat = new Chat({
                participants,
                picture,
                type,
                name,
                createdAt: new Date()
            });

            newChat.save();
            res.send(newChat);
        } else {
            res.send();
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

const retrieveNewMessages = (chats, currentUserId) => {
    const chatsWithNewMessages = chats.map(chat => {
        let numNewMessages = 0;

        chat.messages.forEach(msg => {
            const readByUser = msg.readBy.includes(currentUserId);

            if (!readByUser) {
                numNewMessages ++;
            }
        })
        chat.newMessages = numNewMessages;

        return chat
    });

    return chatsWithNewMessages;
}

const sortMessages = (chats) => {
    const sortedMessages = chats.map(chat => {
        chat.messages.sort((currMsg, nextMsg) => {
            if (currMsg.date > nextMsg.date) {
                return -1;
            } else {
                return 1;
            }
        })

        return chat;
    });

    return sortedMessages;
}

const sortChatRooms = (chats) => {
    const sortedChatRooms = chats.sort((currChat, nextChat) => {
        let currChatDate = currChat.createdAt;
        let nextChatDate = nextChat.createdAt;

        if (currChat.messages.length) {
            currChatDate = currChat.messages[0].date;
        }  
        
        if (nextChat.messages.length) {
            nextChatDate = nextChat.messages[0].date;
        }

        if (currChatDate > nextChatDate) {
            return -1
        } else {
            return 1
        }
    });

    return sortedChatRooms;
}