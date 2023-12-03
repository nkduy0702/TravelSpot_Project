const mysql = require("mysql2");
const postModel = require("../models/postsModel");

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
  console.log("Connected to MySQL - USERS");
});

// Get Information about User
function getInforUser(req, res) {
  if (req.session.loggedin) {
    const id = req.session.userId;
    const NameOfUser = req.session.lastName + " " + req.session.firstName;
    connection.query("SELECT * FROM users WHERE Id = ?", [id], (err, user) => {
      if (err) {
        console.error("Error executing query:", err);
      } else {
        res.render("updateInfor", { user, NameOfUser });
      }
    });
  } else {
    res.render("login", { message: "Đăng nhập không thành công!!!" }); // Chuyển hướng nếu người dùng chưa đăng nhập
  }
}

function updateInfor(req, res) {
  const { fn, ln, email, id } = req.body;
  const sql =
    "UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?";

  connection.query(sql, [fn, ln, email, id], (err, rs) => {
    if (err) throw err;
    res.send("OK");
  });
  // console.log(fn, ln, email, id);
}

// add user into DB
// Import thêm bcrypt để mã hóa mật khẩu
const bcrypt = require("bcrypt");

function createUser(req, res) {
  const { fname, lname, email, password } = req.body;
  console.log(req.body);
  const sql =
    "INSERT INTO users (firstName, lastName, Email, password) VALUES ( ?, ?, ?, ?)";
  // Kiểm tra xem tên đăng nhập đã tồn tại chưa
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) throw err;
      // console.error("Error inserting data:", err);
      if (results.length > 0) {
        // res.send("email already exists");
        res.render("register", {
          message: "Email đã tồn tại, vui lòng nhập lại email khác!!",
        });
      } else {
        // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) throw err;
          // Lưu thông tin người dùng vào cơ sở dữ liệu
          connection.query(sql, [fname, lname, email, hash], (err, result) => {
            if (err) throw err;
            res.render("login", {
              message: "CHÚC MỪNG! BẠN ĐÃ ĐĂNG KÝ THÀNH CÔNG! HÃY ĐĂNG NHẬP.",
            });
          });
        });
      }
    }
  );
}

function updatePass(req, res) {
  const { newPass, id } = req.body;
  const sql = "UPDATE users SET password = ? WHERE id = ?";
  console.log(newPass, id);
  bcrypt.hash(newPass, 10, (err, hash) => {
    if (err) throw err;
    // Lưu thông tin người dùng vào cơ sở dữ liệu
    connection.query(sql, [hash, id], (err, result) => {
      if (err) throw err;
      res.send("Bạn đã cập nhật thành công!");
    });
  });
}

// Login
function loginUser(req, res) {
  const { email, password } = req.body;
  // console.log(req.body); // Thông Tin đăng nhập
  const sql = "SELECT * FROM users WHERE email = ?";
  connection.query(sql, [email], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      const user = results[0];

      // So sánh mật khẩu đã mã hóa với mật khẩu người dùng nhập vào
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;

        if (result) {
          // Lưu thông tin người dùng vào session
          req.session.loggedin = true;
          req.session.userId = user.id;
          req.session.email = user.Email;
          req.session.lastName = user.lastName;
          req.session.firstName = user.firstName;

          const IdOfUser = user.id;

          const NameOfUser = user.lastName + " " + user.firstName;
          console.log(NameOfUser);

          postModel.getAllPosts((err, posts) => {
            if (err) {
              res
                .status(500)
                .json({ success: false, message: "Internal Server Error" });
            } else if (user.id == 1) {
              res.render("admin");
            } else {
              res.render("newfeed", {
                message: "Đăng nhập thành công!",
                posts,
                NameOfUser,
                IdOfUser,
              });
            }
          });
          // res.render("newfeed", { message: "Đăng nhập thành công!" });
        } else {
          res.render("login", {
            message: "Mật khẩu không đúng! vui lòng nhập lại!",
          });
        }
      });
    } else {
      res.render("login", {
        message: "Tài khoản không tồn tại!!",
      });
    }
  });
}

function logout(req, res) {
  req.session.loggedin = false;
  res.render("login", { message: "Đăng xuất thành công" });
}

function stat(req, res) {
  const sql1 = "SELECT * FROM users;";
  const sql2 = "SELECT COUNT(*) as userCount FROM users;";

  // Thực hiện truy vấn lấy danh sách người dùng
  connection.query(sql1, (err, results1) => {
    if (err) {
      console.error(err);
      throw err;
    }
    results1.shift();
    const users = results1;

    // Tiếp theo, thực hiện truy vấn lấy tổng số người dùng
    connection.query(sql2, (err, results2) => {
      if (err) {
        console.error(err);
        throw err;
      }
      const userCount = results2[0].userCount - 1;

      console.log(users, userCount);
      res.json({ users, userCount });
    });
  });
}

module.exports = {
  getInforUser,
  createUser,
  loginUser,
  logout,
  updateInfor,
  updatePass,
  stat,
};
