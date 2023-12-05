const Chat = require("../models/chat");
const userController = require("../controllers/user");
const validation = require("../utils/validations");

const save = async (req, res) => {
  const { participants, messages } = req.body;

  const isAllUser = await userController.someUser(participants);

  if (!isAllUser) {
    res.status(400).json({ code: 400, message: "Usuario no encontrado" });
    return;
  }
  const chat = Chat({
    participants: participants,
    messages: messages,
  });
  try {
    const chatSaved = await chat.save();
    res.json(chatSaved);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await Chat.deleteOne({ _id: chatId });
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const list = async (req, res) => {
  try {
    const allChats = await Chat.find();
    res.json(allChats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  const { chatId } = req.params;
  try {
    const chat = await Chat.findById(chatId);
    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getByUserId = async (req, res) => {
  const { userId } = req.params;
  if (!userId || !validation.isValidObjectId(userId)) {
    res.status(400).json({ message: "Usuario no encontrado" });
    return;
  }
  try {
    const chats = await Chat.find({ participants: userId });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  save,
  remove,
  list,
  getById,
  getByUserId,
};
