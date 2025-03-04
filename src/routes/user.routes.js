const express = require("express");
const { updateUserRole } = require("../infrastructure/controllers/UserController")
const verifyToken = require("../middlewares/verifyToken");
const verifyRole = require("../middlewares/verifyRole");

const router = express.Router();

router.put("/update-role", verifyToken, verifyRole("owner"), updateUserRole);

module.exports = router;
