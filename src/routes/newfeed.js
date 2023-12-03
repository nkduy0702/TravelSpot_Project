const express = require("express");
const router = express.Router();
const newfeedController = require("../controllers/NewfeedController");

const multer = require("multer");
const path = require("path");

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

router.post("/individualPost/:slug", upload, newfeedController.updatePost);
router.use("/individualPost/:slug", newfeedController.updatePostform);
router.post("/individualPost", newfeedController.deletePost);
router.use("/individualPost", newfeedController.individual);
router.post("/updateInfor/pass", newfeedController.updatePass);
router.post("/updateInfor", newfeedController.updateinfor);
router.use("/updateInfor", newfeedController.indexUpdateinfor);
router.post("/rating", newfeedController.rating);
router.post("/delcmt", newfeedController.delcmt);
router.post("/edit", newfeedController.updateCmt);
router.post("/:slug", newfeedController.addcmt);

router.use("/:slug", newfeedController.detailPost);

router.use("/", newfeedController.index);

module.exports = router;
