const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	msg: {
		type: String,
		required: true
	},
	date: {
        type: Date,
        default: Date.now,
        required: true
    }
}, {
    collection: 'chatroom'
});

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;
