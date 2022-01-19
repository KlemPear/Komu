const Event = require("../models/Event");
const Komu = require("../models/Komu");

module.exports.getAllEvents = async (req, res, next) => {
	try {
		const komuId = req.headers.komu_id;
		const events = await Event.find({ komu: komuId })
			.populate("author")
			.populate("guests")
			.populate("komu");
		return res.status(200).json(events);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.getEventById = async (req, res, next) => {
	try {
		const event = await Event.findById(req.params.eventId)
			.populate("author")
			.populate("guests")
			.populate("komu");
		return res.status(200).json(event);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.createEvent = async (req, res, next) => {
	try {
		const komuId = req.headers.komu_id;
		const event = req.body;
		event.komu = await Komu.findById(komuId);
		console.log(event);
		const newEvent = new Event(event);
		console.log(newEvent);
		newEvent.save();
		return res.status(200).json(newEvent);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.editEvent = async (req, res, next) => {
	try {
		const { eventId } = req.params;
		const event = await Event.findByIdAndUpdate(eventId, req.body, {
			returnDocument: "after",
		});
		return res.status(200).json(event);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.deleteEvent = async (req, res, next) => {
	try {
		const { eventId } = req.params;
		const deleteEvent = await Event.findByIdAndDelete(eventId);
		return res.status(200).json(deleteEvent);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
