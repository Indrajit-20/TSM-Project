const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  bus_id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  bus_num: {
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
  arrival_time: {
    type: Date,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  total_seats: {
    type: Number,
    required: true,
  },
  available_seats: {
    type: Number,
    required: true,
  },
  class_type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Bus", busSchema);
