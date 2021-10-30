const mongoose = require("mongoose");
const User = require("./User");
const ChatRoom = require("./ChatRoom");

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		text: {
			type: String,
		},
		chatRoom: {
			type: Schema.Types.ObjectId,
			ref: "ChatRoom",
		},
		readByUserIds: [{ type: String }],
	},
	{
		timestamps: true,
		collection: "messages",
	}
);

module.exports = mongoose.model("Message", MessageSchema);
