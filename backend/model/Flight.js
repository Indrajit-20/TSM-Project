const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flight_id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  flight_num: {
    type: String,
    required: true,
    unique: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  departure_time: {
    type: Date,
    required: true,
  },
  arrival_time: { type: Date, required: true },
  price: { type: Number, required: true },
  total_seats: { type: Number, required: true },
  available_seats: { type: Number, required: true },
});

module.exports = mongoose.model("Flight", flightSchema);
