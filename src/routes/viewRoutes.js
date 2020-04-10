const { mainJS, styleCSS, homePage } = require("../controllers/viewController");

const viewRoutes = app => {
  app.route("/mainJS").get(mainJS);
  app.route("/styleCSS").get(styleCSS);
  app.route("/").get(homePage);
};

module.exports = { viewRoutes };
