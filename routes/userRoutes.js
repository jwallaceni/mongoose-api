const express = require('express');
const router = express.Router();

const requireAuth = require('../helpers/auth');

const {
  createUser,
  getAllUsers,
  loginUser
} = require('../controllers/users');

// Create a user
router.post('/', createUser);

// Get all users
router.get('/users', getAllUsers);

// Log user in
router.post('/login', loginUser);

// Update a user
// router.patch('/:id', updateUser);

// Delete a user
// router.delete('/:id', deleteUser);

// Protected route
router.get('/dashboard', requireAuth, (req, res) => {
  res.status(200).json({ message: "Dashboard" })
});

module.exports = router;