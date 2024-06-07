const { Router } = require("express");
const eventController = require("../controller/event.controller");
const router = Router();

// URL START WITH : /event

router.get("/", eventController.get_event);
router.post("/", eventController.create_event);

module.exports = router;
