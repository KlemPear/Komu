const Event = require("../models/Event");

module.exports.getAllEvents = async (req, res, next) => {
	try {
    console.log(req.headers.komu_id);
    return res.status(200).json("ok");
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.getEventById = async (req, res, next) => {
	try {
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.createEvent = async (req, res, next) => {
	try {

	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.editEvent = async (req, res, next) => {
	try {
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.deleteEvent = async (req, res, next) => {
	try {
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};