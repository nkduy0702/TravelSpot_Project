const postModel = require("../models/postsModel");

class PostController {
  // [GET] /newfeed
  index(req, res) {
    if (req.session.loggedin) {
      const IdOfUser = req.session.userId;
      const NameOfUser = req.session.lastName + " " + req.session.firstName;
      res.render("post", { Message: null, IdOfUser, NameOfUser });
    } else {
      res.render("login", { message: "Đăng nhập không thành công!!!" }); // Chuyển hướng nếu người dùng chưa đăng nhập
    }
  }

  addPost(req, res) {
    postModel.addpost(req, res);
    postModel.getAllPosts((err, posts) => {
      if (err) {
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      } else {
        const IdOfUser = req.session.userId;
        const NameOfUser = req.session.lastName + " " + req.session.firstName;
        res.render("newfeed", {
          message: "Thêm bài viết thành công!",
          posts,
          IdOfUser,
          NameOfUser,
        });
      }
    });
  }

  rating(req, res) {
    const { rating } = req.body;
    console.log(rating);
  }
}

module.exports = new PostController();
