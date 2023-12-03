const userModel = require("../models/userModel");
const postModel = require("../models/postsModel");

class AdminController {
  // [GET] /newfeed
  index(req, res) {
    res.render("admin");
  }
  statuser(req, res) {
    userModel.stat(req, res);
  }
  statpost(req, res) {
    postModel.stat(req, res);
  }
}

module.exports = new AdminController();
