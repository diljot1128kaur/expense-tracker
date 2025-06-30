const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Update subscription status
router.put('/subscription', auth, async (req, res) => {
  try {
    const { isPro } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { isPro },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isPro: user.isPro
    });
  } catch (error) {
    console.error('Update subscription error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 