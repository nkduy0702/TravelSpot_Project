const userModel = require("../models/userModel");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

class registerController {
  // [GET] /register
  index(req, res) {
    res.render("register");
  }

  excute(req, res) {
    console.log("Success");
  }
}

module.exports = new registerController();
