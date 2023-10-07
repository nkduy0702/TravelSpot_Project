const newfeedRouter = require("./newfeed");
const registerRouter = require("./register");

function Route(app) {
  app.use("/newfeed", newfeedRouter);

  app.use("/register", registerRouter);

  app.get("/login", (req, res) => {
    res.render("Login");
  });
  app.get("/search", (req, res) => {
    res.render("search");
  });
}

module.exports = Route;
