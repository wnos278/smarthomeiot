const User = require("../model/user");
const Chat = require("../model/chat");

/**
 * Return all users
 * @param {*} req
 * @param {*} res
 */
exports.users = async (req, res) => {
  const name = req.query.name;
  const users = await User.find({
    name: new RegExp(".*" + name + ".*", "i"),
  });
  res.status(200).json(users);
};

/**
 * Push the chat in chats array
 * @param {*} req
 * @param {*} res
 */
exports.storeChat = async (req, res) => {
  const { sender, message, room } = req.body;
  try {
    const chat = await Chat.findOne({ room: room });

    const chatMessage = {
      sender: sender,
      message: message,
    };

    chat.chats.push(chatMessage);

    const response = await chat.save();

    res.status(200).json("chat saved");
  } catch (err) {
    console.log(err);
  }
};

// get chats
exports.getChats = async (req, res) => {
  const room = req.query.room;
  try {
    const chat = await Chat.findOne({ room: room })
      .populate("chats.sender", "name")
      .select("chats");
    console.log("All chats triggered");
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
  }
};
