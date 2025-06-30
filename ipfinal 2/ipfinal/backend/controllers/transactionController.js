const Transaction = require('../models/Transaction');
const { validationResult } = require('express-validator');


// Create Transaction
exports.createTransaction = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const transaction = new Transaction({
      ...req.body,
      user: req.userId
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Transactions
exports.getTransactions = async (req, res) => {
  try {
    const { type, startDate, endDate, category, sort = '-date' } = req.query;
    const query = { user: req.userId };

    // Apply filters
    if (type) query.type = type;
    if (category) query.category = category;
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const transactions = await Transaction.find(query)
      .sort(sort)
      .exec();

    res.json(transactions);
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Transaction by ID
exports.getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Transaction
exports.updateTransaction = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    console.error('Update transaction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Transaction Summary
exports.getTransactionSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = { user: req.userId };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const summary = await Transaction.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(summary);
  } catch (error) {
    console.error('Get summary error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 