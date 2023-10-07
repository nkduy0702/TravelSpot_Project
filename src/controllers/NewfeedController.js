const userModel = require("../models/userModel");

class NewfeedController {
  // [GET] /newfeed
  index(req, res) {
    res.render("newfeed");
  }

  // [GET] /newfeed/slug
  show(req, res) {
    res.send(req.params.slug);
    userModel.getInfoUser();
  }
}

module.exports = new NewfeedController();
