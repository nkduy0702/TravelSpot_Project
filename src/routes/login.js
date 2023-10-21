const express = require("express");

const router = express.Router();
const loginController = require("../controllers/LoginController");

router.post("/", loginController.login);
router.use("/logout", loginController.indexLogout);
router.use("/", loginController.index);

module.exports = router;
