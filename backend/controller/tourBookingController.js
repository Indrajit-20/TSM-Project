const TourBooking = require("../model/TourBooking");
const TourPackage = require("../model/TourPackage");
const User = require("../model/Custmer");

// Book a tour
const bookTour = async (req, res) => {
  try {
  
    const requestingUserId = req.user?.id;

    const {
      userId: bodyUserId,
      packageId,
      fullName: bodyFullName,
      email: bodyEmail,
      phone: bodyPhone,
      travellers,
      startDate,
      endDate: bodyEndDate,
    } = req.body;

    // Use token userId when available
    const userId = requestingUserId || bodyUserId;

    // Basic validation: require authenticated user, packageId, travellers and startDate
    if (!userId) {
      return res.status(401).json({ message: "Authentication required to book a package." });
    }

    if (!packageId || !travellers || !startDate) {
      return res.status(400).json({ message: "Please provide number of travellers and start Date." });
    }

    // Fetch the package to get the correct price
    const packageData = await TourPackage.findById(packageId);
    if (!packageData) {
      return res.status(404).json({ message: "Tour package not found" });
    }

    // Fetch user details to fill missing contact info
    const user = await User.findById(userId);

    const fullName = bodyFullName || user?.name || "";
    const email = bodyEmail || user?.email || "";
    const phone = bodyPhone || (user?.phone_no ? String(user.phone_no) : "");

    
    const endDate = bodyEndDate || startDate;

    // Calculate total price
    const calculatedPrice = packageData.price * Number(travellers);

    
    const newBooking = new TourBooking({
      userId,
      packageId,
      fullName,
      email,
      phone,
      travellers: Number(travellers),
      totalPrice: calculatedPrice,
      startDate,
      endDate,
      status: "Pending",
    });

    // Save to MongoDB
    const savedBooking = await newBooking.save();

    res.status(201).json({ message: "Booking successful!", bookingDetails: savedBooking });
  } catch (err) {
    console.error("Booking Error:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Validation failed", errors: err.errors });
    }
    res.status(500).json({ message: "Server error during booking", error: err.message });
  }
};




module.exports = { bookTour };