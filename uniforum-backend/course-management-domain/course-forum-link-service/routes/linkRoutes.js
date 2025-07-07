const express = require("express");
const router = express.Router();
const { addLink, listLinks } = require("../controllers/linkController");

router.post("/", addLink);
router.get("/", listLinks);

module.exports = router;
