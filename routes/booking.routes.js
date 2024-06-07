const { Router } = require("express");
const bookingController = require("../controller/booking.controller");
const router = Router();
const authMiddleware = require("../middleware/auth");

// URL START WITH : /booking

router.post("/:event_code", authMiddleware, bookingController.book_event);
router.get("/my-bookings", authMiddleware, bookingController.get_user_booking);

module.exports = router;
