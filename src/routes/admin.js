const express = require("express");

const router = express.Router();
const AdminController = require("../controllers/AdminController");

router.post("/statuser", AdminController.statuser);
router.post("/statpost", AdminController.statpost);

router.use("/", AdminController.index);

module.exports = router;
