// Import DB Schema
const Book = require('../models/books');

// Create a book
exports.createBook = (req, res) => {
  const newBook = new Book({
    book_name: req.body.book_name,
    book_author: req.body.book_author,
    book_image: req.body.book_image,
    book_quantity: req.body.book_quantity,
  });
  newBook.save(err => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(newBook);
  });
}

// Get all books
exports.getAllBooks = (req, res) => {
  Book.find((err, books) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(books);
  });
}

// Get a single book
exports.getOneBook = (req, res) => {
  Book.findOne(
  {
    _id: req.params.id
  },
  (err, book) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(book)
  });
}

// Update a book
exports.updateBook = (req, res) => {
  Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, book) => {
      if (err) return res.status(500).json(err);
      return res.json(book);
    }
  )
}

// Delete a book
exports.deleteBook = (req, res) => {
  Book.findByIdAndRemove(req.params.id, (err, book) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "Book successfully deleted" });
  });
}