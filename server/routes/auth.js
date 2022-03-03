const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const auth = require("../middleware/verifyToke");

router.post("/login", authController.signin);
router.get("/logout", auth, authController.logout);
router.post("/register", authController.signup);
router.get("/chat", auth, authController.chat);

module.exports = router;
