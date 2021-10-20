const express = require("express");
// controllers
const chatRoom = require("../controllers/chatRoom");

const router = express.Router();

router
	.get("/:komuId", chatRoom.getChatRooms)
	.get("/:komuId/:roomId", chatRoom.getConversationByRoomId)
	.post("/:komuId/create-chatroom", chatRoom.createChatRoom)
	.post("/:komuId/:roomId/message", chatRoom.postMessage)
	.put("/:komuId/:roomId/mark-read", chatRoom.markConversationReadByRoomId);

module.exports = router;
