const Komu = require("../models/Komu");

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
		const komu = new Komu(req.body);
		await komu.save();
		return res.status(200).json({ success: true, komu });
	} catch (error) {
		return res.status(500).json({ success: false, error: error });
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
