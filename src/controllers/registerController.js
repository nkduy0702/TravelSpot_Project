const userModel = require("../models/userModel");

class RegisterController {
  // [GET] /register
  index(req, res) {
    res.render("register", { Message: null });
  }

  addUser(req, res) {
    userModel.createUser(req, res);
  }
}

module.exports = new RegisterController();
