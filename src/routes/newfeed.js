const express = require("express");
const router = express.Router();
const newfeedController = require("../controllers/NewfeedController");

router.use("/:slug", newfeedController.show);
router.use("/", newfeedController.index);

module.exports = router;
