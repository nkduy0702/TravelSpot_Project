const postModel = require("../models/postsModel");

class NewfeedController {
  // [GET] /newfeed
  index(req, res) {
    if (req.session.loggedin) {
      const IdOfUser = req.session.userId;
      const NameOfUser = req.session.lastName + " " + req.session.firstName;
      // console.log(IdOfUser);

      postModel.getAllPosts((err, posts) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        } else {
          res.render("newfeed", { posts, NameOfUser });
        }
      });
    } else {
      res.render("login", { message: "Đăng nhập không thành công!!!" }); // Chuyển hướng nếu người dùng chưa đăng nhập
    }
  }

  individual(req, res) {
    postModel.getIndividualPosts(req, res);
  }

  updatePost(req, res) {
    res.render("updatePost");
  }

  updateinfor(req, res) {
    if (req.session.loggedin) {
      const IdOfUser = req.session.userId;
      const NameOfUser = req.session.lastName + " " + req.session.firstName;
      // console.log(IdOfUser);
      res.render("updateInfor", { IdOfUser, NameOfUser });
    }
  }

  detailPost(req, res) {
    console.log(req.params.slug);
    postModel.getPost(req, res);
    // console.log(IdOfUser);
  }
}

module.exports = new NewfeedController();
