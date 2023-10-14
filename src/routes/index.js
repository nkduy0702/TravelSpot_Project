const newfeedRouter = require("./newfeed");
const registerRouter = require("./register");
const loginRouter = require("./login");

function Route(app) {
  app.use("/newfeed", newfeedRouter);

  app.use("/register", registerRouter);

  app.use("/login", loginRouter);

  app.get("/search", (req, res) => {
    res.render("search");
  });
}

module.exports = Route;
