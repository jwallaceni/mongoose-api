const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  book_name: {
    type: String,
    required: true,
  },
  book_author: {
    type: String,
    required: true,
  },
  book_image: {
    type: String,
    required: true,
    default: "https://ckinknoazoro.files.wordpress.com/2011/06/random.jpg",
  },
  book_quantity: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Book', BookSchema);

