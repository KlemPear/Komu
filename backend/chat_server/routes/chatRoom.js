const express = require("express");
// controllers
const chatRoom = require("../controllers/chatRoom");

const router = express.Router();

router
	.get("/:komuId", chatRoom.getChatRooms)
	.get("/:komuId/:roomId", chatRoom.getConversationByRoomId)
	.post("/:komuId/create-chatroom", chatRoom.createChatRoom)
	.post("/:komuId/:roomId/new-message", chatRoom.postMessage)
	.put("/:komuId/:roomId/mark-read", chatRoom.markConversationReadByRoomId)
	.put("/:komuId/:roomId/:messageId", chatRoom.editMessage)
	.delete("/:roomId", chatRoom.deleteRoomById)
	.delete("/:messageId", chatRoom.deleteMessageById);

module.exports = router;
