const express = require("express");
const tourBookingRoutes = require("./routes/tourBookingRoutes");
const connectDB = require("./config/db.js"); // Import the function
const packageRoutes = require("./routes/packageRoutes.js");
const authRouts = require("./routes/authRoutes.js");
const path = require("path");
const app = express();
const PORT = 5000;



// 1. Connect to Database
connectDB();

//cors 
const cors = require("cors");
app.use(cors());

// if /images/ request comes, this will look into images folder physically present in folder
 app.use('/images', express.static(path.join(__dirname, 'images')));

// 2. Middleware to read JSON (Crucial for Login/Register)
app.use(express.json());

// 3. Test Route
app.get("/", (req, res) => {
  res.send("Hompage ....");
});

// This covers ALL package actions: Get, Add, Update, and Delete
app.use("/api/packages", packageRoutes);

app.use("/api/auth", authRouts); //register and login  routes
// Tour Booking Routes
app.use("/api/tour-bookings", tourBookingRoutes);

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
  