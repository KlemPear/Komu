const mongoose = require("mongoose");
const { v4 } = require("uuid");

const Schema = mongoose.Schema;

const KomuSchema = new Schema(
	{
		name: {
			type: String,
		},
		description: {
			type: String,
		},
		users: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		externalId: { type: String, default: () => v4() },
	},
	{
		timestamps: true,
		collection: "komus",
	}
);

module.exports = mongoose.model("Komu", KomuSchema);
