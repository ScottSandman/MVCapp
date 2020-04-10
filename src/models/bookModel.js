const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  yearPublished: {
    type: String
  },
  publisher: {
    type: String
  },
  author_id: {
    type: String,
    required: true
  }
});

const BookModel = mongoose.model("book", bookSchema);

module.exports = { BookModel };
