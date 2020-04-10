const {
  postUser,
  getUser,
  getUsers,
  editUser,
  deleteUser
} = require("../controllers/userController");

const userRoutes = app => {
  app
    .route("/user")
    .get(getUser)
    .post(postUser)
    .put(editUser)
    .delete(deleteUser);
  app.route("/users").get(getUsers);
};

module.exports = { userRoutes };
