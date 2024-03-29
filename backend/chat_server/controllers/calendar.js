const Event = require("../models/Event");
const Komu = require("../models/Komu");

module.exports.getAllEvents = async (req, res, next) => {
	try {
		const komuId = req.params.komuId;
		const events = await Event.find({ komu: komuId });
		return res.status(200).json(events);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.getEventById = async (req, res, next) => {
	try {
		const event = await Event.findById(req.params.eventId);
		return res.status(200).json(event);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.createEvent = async (req, res, next) => {
	try {
		const komuId = req.params.komuId;
		const event = req.body;
		event.komu = await Komu.findById(komuId);
		const newEvent = new Event(event);
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
		const deleteEvent = await Event.findByIdAndRemove(eventId);
		return res.status(200).json(deleteEvent);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};
