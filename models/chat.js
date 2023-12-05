const mongoose = require("mongoose");
const MessageSchema = require("./message");

const chatSchema = mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [MessageSchema],
});

module.exports = mongoose.model("Chat", chatSchema);
