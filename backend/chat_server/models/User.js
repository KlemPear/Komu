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

userSchema.statics.findUsersByIds = async function (usersId) {
	try {
		const users = [];
		for (const id of usersId) {
			const user = await this.findById(id);
			users.push(user);
		}
		return users;
	} catch (error) {
		throw error;
	}
};

module.exports = mongoose.model("User", userSchema);
