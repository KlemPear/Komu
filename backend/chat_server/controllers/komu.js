const Komu = require("../models/Komu");
const User = require("../models/User");

module.exports.getAllKomus = async (req, res, next) => {
	try {
		const komus = await Komu.find({});
		return res.status(200).json({ success: true, komus });
	} catch (error) {
		return res.status(500).json({ success: false, error: error });
	}
};

module.exports.getKomu = async (req, res, next) => {
	try {
		const { komuId } = req.params;
		const komu = await Komu.findById(komuId);
		return res.status(200).json({ success: true, komu });
	} catch (error) {
		return res.status(500).json({ success: false, error: error });
	}
};

module.exports.createKomu = async (req, res, next) => {
	try {
		const { name, description, usersId } = req.body;
		const users = await User.findUsersByIds(usersId);
		const komu = new Komu({
			name: name,
			description: description,
			users: users,
		});
		await komu.save();
		return res.status(200).json(komu);
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.editKomu = async (req, res, next) => {
	try {
		const { komuId } = req.params;
		const komu = await Komu.findByIdAndUpdate(komuId, req.body, {
			returnDocument: "after",
		});
		return res.status(200).json({ success: true, komu });
	} catch (error) {
		return res.status(500).json({ success: false, error: error });
	}
};

module.exports.deleteKomu = async (req, res, next) => {
	try {
		const { komuId } = req.params;
		const deleteKomu = await Komu.findByIdAndDelete(komuId);
		return res.status(200).json({ success: true, deleteKomu });
	} catch (error) {
		return res.status(500).json({ success: false, error: error });
	}
};
