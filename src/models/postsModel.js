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
    connection.query(sql, [idPost], (err, post) => {
      if (err) {
        console.error("Error executing query:", err);
      } else {
        const content = post[0].content;
        // console.log(content);
        res.render("detailPost", { IdOfUser, NameOfUser, post, content });
      }
    });
  } else {
    res.render("login", { message: "Đăng nhập không thành công!!!" });
  }
}

module.exports = {
  addpost,
  getAllPosts,
  getPost,
};
