const express = require("express");
// controllers
const calendarController = require("../controllers/calendar");
// middleware
const { hasSelectedAKomu } = require("../middlewares/index");

const router = express.Router();

router.get("/", hasSelectedAKomu, calendarController.getAllEvents);
router.get("/:eventId", hasSelectedAKomu, calendarController.getEventById);
router.post("/create-event", hasSelectedAKomu, calendarController.createEvent);
router.put("/:eventId", hasSelectedAKomu, calendarController.editEvent);
router.delete("/:eventId", hasSelectedAKomu, calendarController.deleteEvent);

module.exports = router;
