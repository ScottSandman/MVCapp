const {
  postAuthor,
  getAuthor,
  getAuthors,
  editAuthor,
  deleteAuthor
} = require("../controllers/authorController");

const authorRoutes = app => {
  app
    .route("/author")
    .get(getAuthor)
    .post(postAuthor)
    .put(editAuthor)
    .delete(deleteAuthor);
  app.route("/authors").get(getAuthors);
};

module.exports = { authorRoutes };
