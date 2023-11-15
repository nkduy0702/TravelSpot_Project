const newfeedRouter = require("./newfeed");
const registerRouter = require("./register");
const loginRouter = require("./login");
const postRouter = require("./post");
const searchtRouter = require("./search");

function Route(app) {
  app.use("/newfeed", newfeedRouter);

  app.use("/register", registerRouter);

  app.use("/login", loginRouter);

  app.use("/post", postRouter);

  app.use("/search", searchtRouter);
}

module.exports = Route;
