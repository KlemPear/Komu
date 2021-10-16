// utils
const makeValidation = require("@withvoid/make-validation");
// models
const User = require("../models/User");
const { USER_TYPES } = require("../models/User");

module.exports.onGetAllUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		return res.status(200).json({ success: true, users });
	} catch (error) {
		return res.status(500).json({ success: false, error: error });
	}
};

module.exports.onGetUserById = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			throw { error: "No user with this id found" };
		}
		return res.status(200).json({ success: true, user });
	} catch (error) {
		return res.status(500).json({ success: false, error: error });
	}
};

module.exports.onCreateUser = async (req, res, next) => {
	try {
		// Do validation here with Joi
		const { firstName, lastName, type } = req.body;
		const user = await User.create({ firstName, lastName, type });
		return res.status(200).json({ success: true, user });
	} catch (error) {
		return res.status(500).json({ success: false, error: error });
	}
};

module.exports.onDeleteUserById = async (req, res, next) => {
	try {
		const user = await User.deleteOne({ _id: req.params.id });
		if (user.deletedCount === 0) {
			return res
				.status(404)
				.json({
					success: false,
					message: "User not found. Nothing was deleted.",
				});
		}
		return res.status(200).json({
			success: true,
			message: `Deleted a count of ${user.deletedCount} user.`,
		});
	} catch (error) {
		return res.status(500).json({ success: false, error: error });
	}
};
