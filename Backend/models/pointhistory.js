import mongoose from 'mongoose';

const pointHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const PointHistory = mongoose.model('PointHistory', pointHistorySchema);

export default PointHistory;