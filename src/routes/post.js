const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const postController = require("../controllers/PostController");

// Cấu hình Multer để lưu trữ ảnh tải lên
const storage = multer.diskStorage({
  destination: "src/public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Giới hạn kích thước file ảnh (5MB)
}).single("image");


router.post("/", upload, postController.addPost);
router.use("/", postController.index);

module.exports = router;
