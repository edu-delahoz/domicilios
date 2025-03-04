const express = require("express");
const router = express.Router();
const AuthController = require("../infrastructure/controllers/AuthController");
const verifyToken = require("../middlewares/verifyToken")

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", verifyToken, AuthController.getMe);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/logout", verifyToken, AuthController.logout);


module.exports = router;
