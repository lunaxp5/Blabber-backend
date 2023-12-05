const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat");

router.get("/", chatController.list);
router.get("/:chatId", chatController.getById);
router.get("/user/:userId", chatController.getByUserId);
router.post("/", chatController.save);
router.post("/:chatId/message", chatController.saveMessage);
router.delete("/:chatId", chatController.remove);
router.delete("/:chatId/message/:messageId", chatController.removeAMessage);

module.exports = router;
