const express = require('express');
const router = express.Router();

const requireAuth = require('../helpers/auth');

const { 
  createBook,
  getAllBooks,
  getOneBook,
  updateBook,
  deleteBook
} = require('../controllers/books');

// Create a book
router.post('/', requireAuth, createBook);

// Get all books
router.get('/', getAllBooks);

// Get a single book
router.get('/:id', getOneBook);

// Update a book
router.patch('/:id', requireAuth, updateBook);

// Delete a book
router.delete('/:id', requireAuth, deleteBook);

module.exports = router;