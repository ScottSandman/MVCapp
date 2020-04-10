const path = require("path");

const mainJS = async (request, response) => {
  try {
    response.sendFile(path.join(__dirname + "/../views/main.js"));
  } catch (error) {
    response.status(500).send(error);
  }
};

const styleCSS = async (request, response) => {
  try {
    response.sendFile(path.join(__dirname + "/../views/style.css"));
  } catch (error) {
    response.status(500).send(error);
  }
};

const homePage = async (request, response) => {
  try {
    console.log("HOME PAGE");
    response.sendFile(path.join(__dirname + "/../views/index.html"));
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports = {
  mainJS,
  styleCSS,
  homePage
};
