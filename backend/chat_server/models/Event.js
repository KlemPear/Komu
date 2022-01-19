const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		name: {
			type: String,
		},
		description: {
			type: String,
		},
		komu: {
			type: Schema.Types.ObjectId,
			ref: "Komu",
		},
		guests: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		date: {
			type: Date,
		},
	},
	{
		timestamps: true,
		collection: "events",
	}
);

module.exports = mongoose.model("Event", EventSchema);