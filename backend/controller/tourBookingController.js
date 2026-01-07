const TourBooking = require("../model/TourBooking");
// Note: Ensure model names match your files (e.g., 'TourPackage' or 'Package')
const TourPackage = require("../model/TourPackage"); 

// Book a tour
const bookTour = async (req, res) => {
  try {
    const {
      userId,
      packageId,
      fullName,
      email,
      phone,
      travellers, // This is your 'numberOfPersons'
      startDate,
      endDate
    } = req.body;

    // 1. Validation: Check if all fields are present
    if (!userId || !packageId || !fullName || !travellers) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Fetch the package to get the correct price
    const packageData = await TourPackage.findById(packageId);
    if (!packageData) {
        return res.status(404).json({ message: "Tour package not found" });
    }

    // 3. Logic: Backend Price Calculation (Price * Persons)
    const calculatedPrice = packageData.price * travellers;

    // 4. Create new Booking Document
    const newBooking = new TourBooking({
      userId,
      packageId,
      fullName,
      email,
      phone,
      numberOfPersons: travellers, // Mapping 'travellers' from body to schema field
      totalPrice: calculatedPrice,
      startDate,
      endDate,
      status: "Pending" // Default status
    });

    // 5. Save to MongoDB
    const savedBooking = await newBooking.save();

    res.status(201).json({
      message: "Booking successful!",
      bookingDetails: savedBooking
    });

  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ message: "Server error during booking", error: err.message });
  }
}

module.exports = { bookTour };