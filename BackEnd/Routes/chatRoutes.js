const express = require("express");
const router = express.Router();
const chatController = require("../Controllers/chatController");

router.get("/generate-pin", chatController.generatePin);
router.post("/send", chatController.sendMessage);
router.get("/pin/:pin", chatController.getMessagesByPin);
router.get("/check-pin/:pin", chatController.checkPin);
router.get("/pins", chatController.getPins);
router.get("/unseen", chatController.getUnseenMessages);
router.put("/seen", chatController.markMessagesSeen);
router.delete("/delete/:pin", chatController.deleteMessagesByPin);


module.exports = router;
