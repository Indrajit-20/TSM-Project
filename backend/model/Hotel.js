const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  hotel_id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: { type: String },
  room_type: {
    type: String,
    required: true,
  },
  contact_info: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Hotel", hotelSchema);
