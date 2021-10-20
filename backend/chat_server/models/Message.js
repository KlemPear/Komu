const mongoose = require("mongoose");
const User = require("./User");
const ChatRoom = require("./ChatRoom");

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
	{
		userId: {
			type: String,
		},
		text: {
			type: String,
		},
		chatRoomId: {
			type: String,
		}
	},
	{
		timestamps: true,
		collection: "messages",
	}
);

module.exports = mongoose.model("Message", MessageSchema);
