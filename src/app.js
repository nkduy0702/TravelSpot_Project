const path = require("path");
const express = require("express");
const app = express();
// const handlebarsDate = require("handlebars");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const moment = require("moment-timezone"); // Import moment-timezone

// Import ngôn ngữ tiếng Việt
require("moment/locale/vi");

const port = 3000;

app.use(session({ secret: "14072002", resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));

// kết nối Router
const route = require("./routes");
const hbs = handlebars.create({
  extname: ".hbs",
  helpers: {
    formatDate: (date) => {
      return moment(date).fromNow();
    },
  },
});

app.engine("hbs", hbs.engine);

// app.engine(
//   "hbs",
//   handlebars.engine({
//     extname: ".hbs",
//   })
// );
app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "resources", "views"));

app.use(express.static(path.join(__dirname, "public")));

//Routes init
route(app);

app.listen(port, () =>
  console.log(`Running at http://192.168.27.1:${port}/login`)
);
