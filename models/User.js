// backend/models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true }, // Hashed password
  skillLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  location: {
    lat: Number,
    lng: Number,
  },
  // Add other fields as needed (e.g., createdAt, updatedAt, etc.)
});

module.exports = mongoose.model('User', userSchema);