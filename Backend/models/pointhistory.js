import mongoose from 'mongoose';

// Schema to store the history of points added to users
const pointHistorySchema = new mongoose.Schema({
  // Reference to the User who received points
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Number of points added in this event
  points: { type: Number, required: true },

  // Date and time when the points were added (auto-set to now)
  timestamp: { type: Date, default: Date.now }
});


const PointHistory = mongoose.model('PointHistory', pointHistorySchema);

export default PointHistory;