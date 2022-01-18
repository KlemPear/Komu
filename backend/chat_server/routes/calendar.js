const express = require("express");
// controllers
const calendarController = require("../controllers/calendar");
// middleware
const { hasSelectedAKomu } = require("../middlewares/index");

const router = express.Router();

router.get("/", hasSelectedAKomu, calendarController.getAllEvents);
router.get("/:eventId", calendarController.getEventById);
router.post("/create-event", calendarController.createEvent);
router.put("/:eventId", calendarController.editEvent);
router.delete("/:eventId", calendarController.deleteEvent);



module.exports = router;
