//import required libraries
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const { authorRoutes } = require("./src/routes/authorRoutes");
const { bookRoutes } = require("./src/routes/bookRoutes");
const { userRoutes } = require("./src/routes/userRoutes");
const { viewRoutes } = require("./src/routes/viewRoutes");

//set up express to handle paths and set port
const app = express();
const PORT = 3000;

//database connection
mongoose.connect("", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//body parser for url encoding and json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
authorRoutes(app);
bookRoutes(app);
userRoutes(app);
viewRoutes(app);

//start function, export to index.js
const start = () => {
  return app.listen(PORT, () => {
    // console.log is not necessary. used for verification during development
    console.log(`server is running on port ${PORT}`);
  });
};

//export modules
module.exports = { start };
