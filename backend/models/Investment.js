const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
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
  type: {
    type: String,
    required: true,
    enum: ['stock', 'bond', 'mutual_fund', 'real_estate', 'crypto', 'other']
  },
  amount: {
    type: Number,
    required: true
  },
  currentValue: {
    type: Number,
    required: true
  },
  purchaseDate: {
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

const Investment = mongoose.model('Investment', investmentSchema);
module.exports = Investment; 