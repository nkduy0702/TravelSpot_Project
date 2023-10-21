const express = require("express");

const router = express.Router();
const newfeedController = require("../controllers/NewfeedController");

router.use("/updateInfor", newfeedController.updateinfor);
router.use("/individualPost", newfeedController.individual);
router.use("/individualPost/updatePost", newfeedController.updatePost);
router.use("/updateInfor", newfeedController.updateinfor);
router.use("/:slug", newfeedController.detailPost);

router.use("/", newfeedController.index);

module.exports = router;
