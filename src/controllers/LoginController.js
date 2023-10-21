const userModel = require("../models/userModel");

class LoginController {
  // [GET] /newfeed
  index(req, res) {
    res.render("login", { Message: null });
  }

  indexLogout(req, res) {
    // console.log("----------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    userModel.logout(req, res);
  }

  login(req, res) {
    userModel.loginUser(req, res);
    // console.log("------------------success-----------");
  }
}

module.exports = new LoginController();
