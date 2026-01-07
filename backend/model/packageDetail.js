const express = require('express');
const TourPackage = require('../models/TourPackage');
const TourPackageBooking = require('../models/TourPackageBooking');
const router = express.Router();

// Get single package
router.get('/package/:id', async (req, res) => {
  const pkg = await TourPackage.findOne({ Pid: req.params.id });
  res.json(pkg);
});

// Book tour package
router.post('/book-tour', async (req, res) => {
  const { Pid, Cid, StartDate, travelers } = req.body;
  const pkg = await TourPackage.findOne({ Pid });
  
  const booking = new TourPackageBooking({
    Pid,
    Cid,
    StartDate,
    Totalprice: pkg.Price * travelers,
    Status: 'Pending'
  });
  
  await booking.save();
  res.json({ success: true, booking });
});

module.exports = router;
