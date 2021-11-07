const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/Message");
const User = require("../models/User");
const Komu = require("../models/Komu");

module.exports.createChatRoom = async (req, res, next) => {
	try {
		console.log("params: ", req.params);
		console.log("body: ", req.body);
		const { komuId } = req.params;
		const { name, description, usersId } = req.body;
		const users = await User.findUsersByIds(usersId);
		const komu = await Komu.findById(komuId);
		const newChatRoom = new ChatRoom({
			name: name,
			description: description,
			users: users,
			komu: komu,
		});
		console.log("chatroom: ", newChatRoom);
		await newChatRoom.save();
		return res.status(200).json(newChatRoom);
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.postMessage = async (req, res, next) => {
	try {
		const { roomId } = req.params;
		const { userId, text } = req.body;
		const newMessage = new Message({
			chatRoom: roomId,
			text: text,
		});
		const author = await User.findById(userId);
		newMessage.author = author;
		newMessage.readByUserIds.push(userId);
		await newMessage.save();
		return res.status(200).json(newMessage);
	} catch (error) {
		console.log(error)
		return res.status(500).json(error);
	}
};

module.exports.getChatRooms = async (req, res, next) => {
	try {
		const { komuId } = req.params;
		const chatRooms = await ChatRoom.find({ komuId: komuId });
		return res.status(200).json(chatRooms);
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.getConversationByRoomId = async (req, res, next) => {
	try {
		const { roomId } = req.params;
		const messages = await Message.find({ chatRoom: roomId }).populate(
			"author"
		);
		return res.status(200).json(messages);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.markConversationReadByRoomId = async (req, res, next) => {
	try {
		const { roomId } = req.params;
		const { userId } = req.body;
		const messages = await Message.find({ chatRoomId: roomId });
		const filteredMessages = messages.filter(
			(m) => !m.readByUserIds.includes(userId)
		);
		for (const message of filteredMessages) {
			message.readByUserIds.push(userId);
			await message.save();
		}
		return res.status(200).json({ success: true, filteredMessages });
	} catch (error) {
		return res.status(500).json({ success: false, error: error });
	}
};

module.exports.editMessage = async (req, res, next) => {
	try {
		const { roomId, messageId } = req.params;
		const { newText } = req.body;
		const message = await Message.findOneAndUpdate(
			{ chatRoom: roomId, _id: messageId },
			{ text: newText },
			{ new: true }
		);
		return res.status(200).json({ success: true, message });
	} catch (error) {
		return res.status(500).json({ success: false, error: error });
	}
};

module.exports.deleteRoomById = async (req, res, next) => {
	try {
		const { roomId } = req.params;
		const deleteRoomMessages = await Message.deleteMany({ chatRoomId: roomId });
		console.log(deleteRoomMessages);
		const deleteRoom = await ChatRoom.findByIdAndDelete(roomId);
		return res
			.status(200)
			.json({ success: true, deleteRoomMessages, deleteRoom });
	} catch (error) {
		return res.status(500).json({ success: false, error: error });
	}
};

module.exports.deleteMessageById = async (req, res, next) => {
	try {
		const { messageId } = req.params;
		const deleteMessage = await Message.findByIdAndDelete(messageId);
		return res.status(200).json({ success: true, deleteMessage });
	} catch (error) {
		return res.status(500).json({ success: false, error: error });
	}
};
