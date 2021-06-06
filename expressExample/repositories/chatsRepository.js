const Chat = require('../models/chat');
const { ObjectId } = require('mongodb');

exports.getParticipatingChats = async (userId) => {
    return await Chat.find({
        participants: ObjectId(userId)
    }).populate('participants').populate('messages.sentBy');
};

exports.updateUnreadMessages = async (chatId, userId) => {
    await Chat.updateOne({
        _id: chatId
    },
    {
        $addToSet: {
            "messages.$[].readBy": {
                $each: [ ObjectId(userId) ]
            }
        }
    },
    {
        $set: {
            newMessages: 0
        }
    });
};

exports.updateChatNewPost = async (chatId, messageToInsert) => {
    await Chat.updateOne({
        _id: chatId
    },
    {
        $addToSet: {
            "messages": {
                $each: [ messageToInsert ]
            }
        }
    });
};

exports.isUniqueGroup = async (userId) => {
    return await Chat.find({
        participants: userId,
        type: "single"
    }).countDocuments() == 0;
}
