const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const { 
  getTransactions, 
  createTransaction, 
  updateTransaction, 
  deleteTransaction,
  getTransactionSummary 
} = require('../controllers/transactionController');

// Validation rules
const transactionValidation = [
  check('type')
    .notEmpty()
    .isIn(['expense', 'income', 'savings', 'investment'])
    .withMessage('Type must be expense, income, savings, or investment'),
  check('amount')
    .notEmpty()
    .isNumeric()
    .withMessage('Amount must be a number'),
  check('category')
    .notEmpty()
    .withMessage('Category is required'),
  check('date')
    .notEmpty()
    .isISO8601()
    .withMessage('Valid date is required'),
  check('description')
    .optional()
    .trim()
];

// Get transaction summary
router.get('/summary', auth, getTransactionSummary);

// Get all transactions
router.get('/', auth, getTransactions);

// Add transaction
router.post('/', auth, transactionValidation, createTransaction);

// Update transaction
router.put('/:id', auth, transactionValidation, updateTransaction);

// Delete transaction
router.delete('/:id', auth, deleteTransaction);

module.exports = router;