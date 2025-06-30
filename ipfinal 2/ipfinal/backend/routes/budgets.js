const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// Get all budgets for a user
router.get('/', auth, async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.userId });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new budget
router.post(
  '/',
  [
    auth,
    check('category', 'Category is required').not().isEmpty(),
    check('amount', 'Amount must be a positive number').isFloat({ min: 0 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { category, amount } = req.body;

      // Check if budget for this category already exists
      const existingBudget = await Budget.findOne({
        userId: req.user.userId,
        category,
      });

      if (existingBudget) {
        return res.status(400).json({
          message: 'Budget for this category already exists',
        });
      }

      const budget = new Budget({
        userId: req.user.userId,
        category,
        amount,
      });

      await budget.save();
      res.json(budget);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update a budget
router.put(
  '/:id',
  [
    auth,
    check('amount', 'Amount must be a positive number').isFloat({ min: 0 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { amount } = req.body;
      const budget = await Budget.findOne({
        _id: req.params.id,
        userId: req.user.userId,
      });

      if (!budget) {
        return res.status(404).json({ message: 'Budget not found' });
      }

      budget.amount = amount;
      await budget.save();

      res.json(budget);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update spent amount
router.patch(
  '/:id/spent',
  [
    auth,
    check('spent', 'Spent amount must be a positive number').isFloat({ min: 0 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { spent } = req.body;
      const budget = await Budget.findOne({
        _id: req.params.id,
        userId: req.user.userId,
      });

      if (!budget) {
        return res.status(404).json({ message: 'Budget not found' });
      }

      budget.spent = spent;
      await budget.save();

      res.json(budget);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete a budget
router.delete('/:id', auth, async (req, res) => {
  try {
    const budget = await Budget.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    await budget.remove();
    res.json({ message: 'Budget removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 