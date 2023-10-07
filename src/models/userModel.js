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
  console.log("Connected to MySQL");
});

// Get Information about User
function getInfoUser() {
  connection.query("SELECT * FROM user", (err, results, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }
    console.log("Query results:", results);
  });
}
// add user into DB

// Sử dụng body-parser để xử lý dữ liệu từ form

function createUser(userData, callback) {}

module.exports = {
  getInfoUser,
  createUser,
};
