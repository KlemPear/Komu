const Komu = require("../models/Komu");
const User = require("../models/User");

module.exports.getKomusByUserId = async (req, res, next) => {
	try {
		const { userId } = req.query;
		const user = await User.findById(userId).populate("komus");
		return res.status(200).json(user.komus);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

module.exports.getKomuUsers = async (req, res, next) => {
	try {
		const { komuId } = req.params;
		const komu = await Komu.findById(komuId).populate("users");
		return res.status(200).json(komu.users);
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
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
		const { name, description, userId } = req.body;
		const user = await User.findById(userId);
		const komu = new Komu({
			name: name,
			description: description,
		});
		komu.users.push(user);
		user.komus.push(komu);
		User.findOneAndUpdate(
			{ _id: user._id },
			user,
			{ upsert: true },
			function (err, doc) {
				if (err) return res.send(500, { error: err });
			}
		);
		komu.save();
		return res.status(200).json(komu);
	} catch (error) {
		console.log("Create Komu Error: ", error);
		return res.status(500).json(error);
	}
};

module.exports.editKomu = async (req, res, next) => {
	try {
		const { komuId } = req.params;
		const komu = await Komu.findByIdAndUpdate(komuId, req.body, {
			returnDocument: "after",
		});
		return res.status(200).json(komu);
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.deleteKomu = async (req, res, next) => {
	try {
		const { komuId } = req.params;
		const deleteKomu = await Komu.findByIdAndDelete(komuId);
		return res.status(200).json({ success: true, deleteKomu });
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports.joinKomu = async (req, res, next) => {
	try {
		const { externalId, userId } = req.body;
		const komu = await Komu.findOne({ externalId: externalId });
		const user = await User.findById(userId);
		console.log("Komu: ", komu);
		console.log("User:  ", user);
		if (!komu.users?.includes(user._id) && !user.komus?.includes(komu._id)) {
			komu.users.push(user);
			user.komus.push(komu);
			User.findOneAndUpdate(
				{ _id: user._id },
				user,
				{ upsert: true },
				function (err, doc) {
					if (err) return res.send(500, { error: err });
				}
			);
			Komu.findOneAndUpdate(
				{ _id: komu._id },
				komu,
				{ upsert: true },
				function (err, doc) {
					if (err) return res.send(500, { error: err });
				}
			);
			return res.status(200).json({ komu: komu, user: user });
		}
		console.log("userAlreadyInKomu");
		return res.status(200).json({ userAlreadyInKomu: true });
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}
};
