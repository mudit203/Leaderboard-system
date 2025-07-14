import mongoose from 'mongoose';
// Schema to store user information for the leaderboard system
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  // The user's current total points (default is 0)
  points: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);

export default User;