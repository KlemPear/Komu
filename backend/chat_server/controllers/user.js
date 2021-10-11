// utils
const makeValidation = require("@withvoid/make-validation");
// models
const User = require("../models/User");
const { USER_TYPES } = require("../models/User");

module.exports.onGetAllUsers = async (req, res, next) => {};
module.exports.onGetUserById = async (req, res, next) => {};

module.exports.onCreateUser = async (req, res, next) => {
	try {
		// const validation = makeValidation((types) => ({
		// 	payload: req.body,
		// 	checks: {
		// 		firstName: { type: types.string },
		// 		lastName: { type: types.string },
		// 		type: { type: types.enum, options: { enum: USER_TYPES } },
		// 	},
		// }));
		// if (!validation.success) return res.status(400).json(validation);

		const { firstName, lastName, type } = req.body;
		const user = await User.createUser(firstName, lastName, type);
		return res.status(200).json({ success: true, user });
	} catch (error) {
		return res.status(500).json({ success: false, error: error });
	}
};

module.exports.onDeleteUserById = async (req, res, next) => {};
