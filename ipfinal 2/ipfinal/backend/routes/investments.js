const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Investment = require('../models/Investment');

// Get all investments
router.get('/', auth, async (req, res) => {
  try {
    const investments = await Investment.find({ user: req.userId })
      .sort({ purchaseDate: -1 });
    res.json(investments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add investment
router.post('/', auth, async (req, res) => {
  try {
    const { name, type, amount, currentValue, purchaseDate, description } = req.body;
    
    const investment = new Investment({
      user: req.userId,
      name,
      type,
      amount,
      currentValue,
      purchaseDate,
      description
    });

    await investment.save();
    res.status(201).json(investment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update investment
router.put('/:id', auth, async (req, res) => {
  try {
    const investment = await Investment.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { $set: req.body },
      { new: true }
    );

    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    res.json(investment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete investment
router.delete('/:id', auth, async (req, res) => {
  try {
    const investment = await Investment.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    res.json({ message: 'Investment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 