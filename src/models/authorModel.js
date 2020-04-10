const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});

const AuthorModel = mongoose.model("author", authorSchema);

module.exports = { AuthorModel };
