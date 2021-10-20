const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;

const ChatRoomSchema = new Schema(
	{
		komuId: {
			type: String,
		},
		usersId: [
			{
				type: String
			},
		],
		name: {
			type: String,
		},
		description: {
			type: String,
		},
	},
	{
		timestamps: true,
		collection: "chatrooms",
	}
);

module.exports = mongoose.model("ChatRoom", ChatRoomSchema);
