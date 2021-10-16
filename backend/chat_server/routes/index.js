const express = require("express");
// controllers
const user = require("../controllers/user");
// middlewares
const { encode } = require("../middlewares/jwt");

const router = express.Router();

router.post("/login/:userId", encode, (req, res, next) => {
	return res.status(200).json({
		success: true,
		authorization: req.authToken,
	});
});

module.exports = router;
