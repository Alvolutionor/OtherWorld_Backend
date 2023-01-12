import mongoose from 'mongoose';
const MapSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Map', MapSchema);