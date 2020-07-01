const jwt = require('jsonwebtoken')

// Import DB Schema
const User = require('../models/users');

// Create a user

// Update method to use bcrypt to hash user password
exports.createUser = (req, res) => {
  User.findOne(
    {
      username: req.body.username
    },
    (err, user) => {
      if (err) return res.status(500).json(err);
      if (user) {
        return res.status(500).json({ message: "Username already exists!" });
      } else {
        const newUser = new User({
          username: req.body.username,
          password: req.body.password,
          email_address: req.body.email_address,
        });
        newUser.save(err => {
          if (err) return res.status(500).json(err);
          return res.status(200).json(newUser);
        });
      }
    }
  );
}

// Get all users
exports.getAllUsers = (req, res) => {
  User.find((err, users) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(users);
  });
}

// Get a single user
exports.getOneUser = (req, res) => {
  User.findOne(
  {
    _id: req.params.id
  },
  (err, user) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(user)
  });
}

// Update user
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, user) => {
      if (err) return res.status(500).json(err);
      return res.json(user);
    }
  )
}

// Delete user
exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "User successfully deleted" });
  });
}

// Log in user
exports.loginUser = (req, res) => {
  User.findOne(
    {
      username: req.body.username
    },
    (err, user) => {
      if (err) return res.status(500).json(err);
      if (!user) {
        return res.status(500).json({ message: "User does not exist" });
      }
      if (user.password===req.body.password) {
        const token = jwt.sign(req.body.username, process.env.JWT_SECRET);
        res.status(200).json({ token: token });
      } else {
        return res.status(500).json({ message: "Not authenticated" });
      }
    }
  );
}