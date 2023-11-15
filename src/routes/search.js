const express = require("express");

const router = express.Router();
const searchController = require("../controllers/SearchController");

router.post("/", searchController.search);
router.use("/", searchController.index);

module.exports = router;
