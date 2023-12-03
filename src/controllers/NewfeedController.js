const postModel = require("../models/postsModel");
const userModel = require("../models/userModel");

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

  deletePost(req, res) {
    postModel.deletePost(req, res);
  }

  updatePostform(req, res) {
    postModel.getInforPost(req, res);
  }

  updatePost(req, res) {
    postModel.updatePost(req, res);
    postModel.getIndividualPosts(req, res, "Cập nhật thành công!!");
  }

  indexUpdateinfor(req, res) {
    userModel.getInforUser(req, res);
  }

  updateinfor(req, res) {
    userModel.updateInfor(req, res);
  }
  updatePass(req, res) {
    userModel.updatePass(req, res);
  }

  detailPost(req, res) {
    // console.log(req.params.slug);
    postModel.getPost(req, res);
    // console.log(IdOfUser);
  }
  addcmt(req, res) {
    console.log("Suuccess");
    postModel.addComment(req, res);
  }
  delcmt(req, res) {
    postModel.delCmt(req, res);
  }

  updateCmt(req, res) {
    postModel.updateCmt(req, res);
  }
  rating(req, res) {
    postModel.rating(req, res);
  }
}

module.exports = new NewfeedController();
