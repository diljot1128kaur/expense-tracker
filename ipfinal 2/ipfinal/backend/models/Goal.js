const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  targetAmount: {
    type: Number,
    required: true
  },
  currentAmount: {
    type: Number,
    required: true,
    default: 0
  },
  deadline: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal; 