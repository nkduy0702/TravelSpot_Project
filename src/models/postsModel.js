const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "duy072002",
  database: "travelspot",
});

// Mở kết nối
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL - POST");
});

//Thêm bài post

function addpost(req, res) {
  userId = req.session.userId;
  console.log(userId);

  const { location, content, title } = req.body;
  console.log(location, content, title);

  const imagePath = req.file ? "/uploads/" + req.file.filename : null;
  console.log(imagePath);

  const sql =
    "INSERT INTO posts (userId, location, title, content, image) VALUES (?, ?, ?, ?, ?)";

  connection.query(
    sql,
    [userId, location, title, content, imagePath],
    (err, result) => {
      if (err) throw err;
      console.log("Thêm bài post thành công!!!");
    }
  );
}

function updatePost(req, res) {
  const idPost = req.params.slug;

  const { location, content, title } = req.body;
  console.log(location, content, title);

  const imagePath = req.file ? "/uploads/" + req.file.filename : null;
  console.log(imagePath);

  const sql =
    "UPDATE posts SET location = ?, title = ?, content = ?, image = ? WHERE id = ?";

  connection.query(
    sql,
    [location, title, content, imagePath, idPost],
    (err, result) => {
      if (err) throw err;
      console.log("Cập nhật thành công!");
    }
  );
}

// Truy vấn các bài post

function getAllPosts(callback) {
  const sql = "SELECT * FROM users JOIN posts ON users.id = posts.userId";
  connection.query(sql, (err, posts) => {
    if (err) {
      console.error("Error executing query:", err);
      callback(err, null);
    } else {
      callback(null, posts);
    }
  });
}

function getPost(req, res) {
  if (req.session.loggedin) {
    const IdOfUser = req.session.userId;
    const NameOfUser = req.session.lastName + " " + req.session.firstName;

    const idPost = req.params.slug;

    const sql =
      "SELECT * FROM users JOIN posts ON Users.id = posts.userId WHERE posts.id = ?";
    connection.query(sql, [idPost], (err, posts) => {
      if (err) throw err;
      const post = posts[0];
      const content = posts[0].content;
      // console.log(content);
      connection.query(
        "SELECT * FROM users JOIN comments ON users.id = comments.user_id WHERE comments.post_id = ?",
        [idPost],
        (err, rs) => {
          if (err) throw err;
          const comments = rs.map((comment) => {
            comment.isMatchedUser = IdOfUser === comment.user_id;
            return comment;
          });
          // console.log(comments);
          connection.query(
            "SELECT * FROM ratings WHERE user_id = ? and post_id = ?",
            [IdOfUser, idPost],
            (err, rs) => {
              if (err) throw err;

              let isRated;
              if (rs.length > 0) isRated = true;
              else isRated = false;
              connection.query(
                "SELECT rating FROM ratings WHERE post_id =?",
                [idPost],
                (err, rs) => {
                  if (err) throw err;

                  let haveNoRating;
                  if (rs.length == 0) haveNoRating = true;
                  else {
                    haveNoRating = false;
                    var total = 0;
                    rs.forEach((rt) => {
                      total = total + rt.rating;
                    });
                    total = parseFloat(total).toFixed(1);
                    var ratingResult = total / rs.length;
                    // console.log(haveNoRating);
                  }
                  if (haveNoRating)
                    res.render("detailPost", {
                      IdOfUser,
                      NameOfUser,
                      post,
                      content,
                      comments,
                      isRated,
                      ratingResult,
                      haveNoRating,
                    });
                  else
                    res.render("detailPost", {
                      IdOfUser,
                      NameOfUser,
                      post,
                      content,
                      comments,
                      isRated,
                      ratingResult,
                    });
                }
              );
            }
          );
        }
      );
    });
  } else {
    res.render("login", { message: "Đăng nhập không thành công!!!" });
  }
}

function getInforPost(req, res) {
  if (req.session.loggedin) {
    const IdOfUser = req.session.userId;
    const NameOfUser = req.session.lastName + " " + req.session.firstName;
    const idPost = req.params.slug;
    console.log(idPost);
    const sql = "SELECT * FROM  posts WHERE posts.id = ?";
    connection.query(sql, [idPost], (err, post) => {
      if (err) {
        console.error("Error executing query:", err);
      } else {
        // console.log(post);
        res.render("updatePost", { IdOfUser, NameOfUser, post });
      }
    });
  } else {
    res.render("login", { message: "Đăng nhập không thành công!!!" });
  }
}

function getIndividualPosts(req, res, ms) {
  if (req.session.loggedin) {
    const IdOfUser = req.session.userId;
    const NameOfUser = req.session.lastName + " " + req.session.firstName;

    const sql =
      "SELECT * FROM users JOIN posts ON users.id = posts.userId where users.id = ?";
    connection.query(sql, [IdOfUser], (err, posts) => {
      if (err) {
        console.error("Error executing query:", err);
      } else {
        res.render("individualPosts", {
          message: ms,
          IdOfUser,
          NameOfUser,
          posts,
        });
      }
    });
  } else {
    res.render("login", { message: "Đăng nhập không thành công!!!" }); // Chuyển hướng nếu người dùng chưa đăng nhập
  }
}

function deletePost(req, res) {
  const { id } = req.body;
  const sql = "DELETE FROM posts where posts.id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) throw err;
    console.log("Delete Post Success!!");
  });
  res.send("ok");
}

function addComment(req, res) {
  const postId = req.params.slug;
  const userId = req.session.userId; // Lấy ID của người dùng hiện tại
  const content = req.body.comment;
  // console.log(postId, userId, content);

  connection.query(
    "INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)",
    [postId, userId, content],
    (err, results) => {
      if (err) throw err;

      // Chuyển hướng người dùng trở lại trang chi tiết bài viết sau khi thêm bình luận
      res.redirect(`/newfeed/${postId}/#comments-section`);
    }
  );
}

function delCmt(req, res) {
  const { idCmt } = req.body;
  const sql = "DELETE FROM comments where id = ?";
  connection.query(sql, [idCmt], (err, result) => {
    if (err) throw err;
    console.log("Delete Comment Success!!");
  });
  res.send("ok");
}

function updateCmt(req, res) {
  const { idCmt, contentEdited } = req.body;
  // console.log(idCmt, contentEdited);
  const sql = "UPDATE comments SET content = ? WHERE id = ?";
  connection.query(sql, [contentEdited, idCmt], (err, rs) => {
    if (err) throw err;

    console.log("Update Comment Successfully!!");
    res.send("");
  });
}

function rating(req, res) {
  const userId = req.session.userId;

  const { rating, postID } = req.body;
  // console.log(rating, userId, postID);
  const sql = "INSERT INTO ratings (user_id, post_id, rating) VALUES (?, ?, ?)";

  connection.query(sql, [userId, postID, rating], (err, rs) => {
    if (err) throw err;
    console.log("Rating successfully!");
    res.send("ok");
  });
}

function search(req, res) {
  const { contentSearch } = req.body;

  // Chống SQL injection bằng cách sử dụng tham số truy vấn
  const sanitizedSearch = connection.escape(contentSearch);

  const sql = `
  SELECT * FROM users JOIN posts ON users.id = posts.userId
    WHERE
      LOWER(REPLACE(REPLACE(location COLLATE utf8mb4_unicode_ci, 'đ', 'd'), ' ', '')) LIKE LOWER(REPLACE(REPLACE(CONCAT('%', ${sanitizedSearch}, '%') COLLATE utf8mb4_unicode_ci, 'd', 'đ'), ' ', ''))
      OR
      LOWER(REPLACE(REPLACE(location COLLATE utf8mb4_unicode_ci, 'd', 'đ'), ' ', '')) LIKE LOWER(REPLACE(REPLACE(CONCAT('%', ${sanitizedSearch}, '%') COLLATE utf8mb4_unicode_ci, 'đ', 'd'), ' ', ''))
    LIMIT 0, 1000;`;

  connection.query(sql, (err, posts) => {
    if (err) {
      console.error(err);
      res.status(500).send("Lỗi Nội Server");
    } else {
      console.log(posts);
      res.send(posts);
    }
  });
}

module.exports = {
  addpost,
  getAllPosts,
  getPost,
  getIndividualPosts,
  deletePost,
  getInforPost,
  updatePost,
  addComment,
  delCmt,
  updateCmt,
  rating,
  search,
};
