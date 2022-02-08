const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		title: {
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
		start: {
			type: Date,
		},
		end: {
			type: Date,
		},
		allDay: {
			type: Boolean,
		},
	},
	{
		timestamps: true,
		collection: "events",
	}
);

module.exports = mongoose.model("Event", EventSchema);
