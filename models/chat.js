const mongoose = require("mongoose");
const MessageSchema = require("./message");

const ChatSchema = mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: {
    type: [MessageSchema],
    default: [],
  },
});

module.exports = mongoose.model("Chat", ChatSchema);
