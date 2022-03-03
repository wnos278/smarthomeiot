const express = require("express");
const router = express.Router();
const messageController = require("../controller/messageController");
const auth = require("../middleware/verifyToke");

router.get('/turn-on-led', auth, messageController.turnOnLed);
router.get('/turn-off-led', auth, messageController.turnOffLed);

module.exports = router;
