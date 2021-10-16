const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

module.exports.USER_TYPES = {
	CONSUMER: "consumer",
	SUPPORT: "support",
};

const userSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			default: () => uuidv4().replace(/\-/g, ""),
		},
		firstName: String,
		lastName: String,
		type: String,
	},
	{
		timestamps: true,
		collection: "users",
	}
);

module.exports = mongoose.model("User", userSchema);
