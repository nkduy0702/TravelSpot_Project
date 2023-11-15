const postModel = require("../models/postsModel");

class SearchController {
  // [GET] /register
  index(req, res) {
    res.render("search");
  }
  search(req, res) {
    postModel.search(req, res);
  }
}

module.exports = new SearchController();
