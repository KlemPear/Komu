const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4 } = require("uuid");

module.exports.USER_TYPES = {
	CONSUMER: "consumer",
	SUPPORT: "support",
};

const userSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			default: () => v4().replace(/\-/g, ""),
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

userSchema.statics.createUser = async function (firstName, lastName, type) {
	try {
		const user = await this.create({ firstName, lastName, type });
		return user;
	} catch (error) {
		throw error;
	}
};

module.exports = mongoose.model("User", userSchema);
