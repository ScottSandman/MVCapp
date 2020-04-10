const {
  postBook,
  getBook,
  getBooks,
  editBook,
  deleteBook,
  getBooksByAuthor
} = require("../controllers/bookController");

const bookRoutes = app => {
  app
    .route("/book")
    .post(postBook)
    .get(getBook)
    .put(editBook)
    .delete(deleteBook);

  app.route("/books").get(getBooks);

  app.route("/booksbyauthor").get(getBooksByAuthor);
};

module.exports = { bookRoutes };
