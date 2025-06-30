const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Goal = require('../models/Goal');

// Get all goals
router.get('/', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.userId })
      .sort({ deadline: 1 });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add goal
router.post('/', auth, async (req, res) => {
  try {
    const { name, targetAmount, currentAmount, deadline, description } = req.body;
    
    const goal = new Goal({
      user: req.userId,
      name,
      targetAmount,
      currentAmount,
      deadline,
      description
    });

    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update goal
router.put('/:id', auth, async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { $set: req.body },
      { new: true }
    );

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete goal
router.delete('/:id', auth, async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.json({ message: 'Goal deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 