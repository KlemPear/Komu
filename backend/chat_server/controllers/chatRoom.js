const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/Message");

module.exports.createChatRoom = async (req, res, next) => {
	try {
		const { komuId } = req.params;
		const { name, description, usersId } = req.body;
		const newChatRoom = new ChatRoom({
			komuId: komuId,
			name: name,
			description: description,
			usersId: usersId,
		});
		await newChatRoom.save();
		return res.status(200).json({ success: true, newChatRoom });
	} catch (error) {
		return res.status(500).json({ success: false, error: error });
	}
};

module.exports.postMessage = async (req, res, next) => {
	try {
		const { roomId } = req.params;
		const { userId, text } = req.body;
		const newMessage = new Message({
			roomId: roomId,
			userId: userId,
			text: text,
		});
		await newMessage.save();
		return res.status(200).json({ success: true, newMessage });
	} catch (error) {
		return res.status(500).json({ success: false, error: error });
	}
};

module.exports.getChatRooms = async (req, res, next) => {
	try {
		const { komuId } = req.params;
		const chatRooms = await ChatRoom.find({ komuId: komuId });
		return res.status(200).json({ success: true, chatRooms });
	} catch (error) {
		return res.status(500).json({ success: false, error: error });
	}
};

module.exports.getConversationByRoomId = async (req, res, next) => {};
module.exports.markConversationReadByRoomId = async (req, res, next) => {};
