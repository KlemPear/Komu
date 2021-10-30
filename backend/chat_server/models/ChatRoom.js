const mongoose = require("mongoose");
const User = require("./User");

const Schema = mongoose.Schema;

const ChatRoomSchema = new Schema(
	{
		komu: {
			type: Schema.Types.ObjectId,
			ref: "Komu",
		},
		usersId: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
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
