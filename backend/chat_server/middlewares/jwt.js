const jwt = require("jsonwebtoken");

module.exports.decode = (req, res, next) => {
	next();
};

module.exports.encode = async (req, res, next) => {
	next();
};
