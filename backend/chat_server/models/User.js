const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
	{
		firstName: String,
		lastName: String,
		email: String,
		bio: String,
		komus: [{ type: Schema.Types.ObjectId, ref: "Komu" }],
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

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
