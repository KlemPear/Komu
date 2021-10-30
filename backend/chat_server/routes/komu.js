const express = require("express");
// controllers
const komuController = require("../controllers/komu");

const router = express.Router();

router
	.get("/", komuController.getAllKomus)
	.get("/:komuId", komuController.getKomu)
	.post("/", komuController.createKomu)
	.put("/:komuId", komuController.editKomu)
	.delete("/:komuId", komuController.deleteKomu);

module.exports = router;
