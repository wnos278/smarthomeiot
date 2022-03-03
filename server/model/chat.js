const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  recevier: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  room: {
    type: String,
    max: 255,
    min: 6,
  },
  chats: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
      message: {
        type: String,
      },
    },
  ],
});

// generate jwt token
const Chat = mongoose.model("Chats", ChatSchema);

module.exports = Chat;
