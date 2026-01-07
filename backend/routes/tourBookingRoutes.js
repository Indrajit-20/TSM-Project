const {bookTour, getUserBookings} = require("../controller/tourBookingController");
const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");

router.post("/book", authMiddleware, bookTour);
// router.get("/my-bookings", authMiddleware, getUserBookings);    

module.exports = router;