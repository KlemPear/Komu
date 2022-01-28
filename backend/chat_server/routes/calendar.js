const express = require("express");
// controllers
const calendarController = require("../controllers/calendar");
// middleware
const { hasSelectedAKomu } = require("../middlewares/index");

const router = express.Router();

router.get("/:komuId", calendarController.getAllEvents);
router.get("/:eventId", calendarController.getEventById);
router.post("/:komuId", calendarController.createEvent);
router.put("/:eventId", calendarController.editEvent);
router.delete("/:eventId", calendarController.deleteEvent);

module.exports = router;
