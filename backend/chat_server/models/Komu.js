const mongoose = require("mongoose");
const User = require("./User");
const ChatRoom = require("./ChatRoom");

const Schema = mongoose.Schema;

const KomuSchema = new Schema(
	{
		name: {
			type: String,
		},
		description: {
			type: String,
		},
		Users: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		timestamps: true,
		collection: "komus",
	}
);

module.exports = mongoose.model("Komu", KomuSchema);
