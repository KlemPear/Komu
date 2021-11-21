const express = require("express");
// controllers
const komuController = require("../controllers/komu");

const router = express.Router();

router
	.get("/", komuController.getKomusByUserId)
	.get("/:komuId", komuController.getKomu)
	.post("/", komuController.createKomu)
	.post("/join-komu", komuController.joinKomu)
	.put("/:komuId", komuController.editKomu)
	.delete("/:komuId", komuController.deleteKomu);

module.exports = router;
