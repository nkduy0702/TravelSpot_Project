const express = require("express");

const router = express.Router();
const registerController = require("../controllers/RegisterController");

router.post("/", registerController.addUser);
router.use("/", registerController.index);

module.exports = router;
