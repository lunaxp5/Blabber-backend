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

const saveMessage = async (req, res) => {
  const { chatId } = req.params;
  const { sender, receiver, description } = req.body;

  if (
    !validation.isValidObjectId(sender) ||
    !validation.isValidObjectId(receiver)
  ) {
    res.status(400).json({ message: "Usuario no encontrado" });
    return;
  }

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat no encontrado" });
    }
    const message = {
      sender,
      receiver,
      description,
    };

    chat.messages.push(message);

    const updatedChat = await chat.save();
    res.json(updatedChat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeAMessage = async (req, res) => {
  const { chatId, messageId } = req.params;
  console.log(messageId);

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat no encontrado" });
    }

    chat.messages.pull({ _id: messageId });

    const updatedChat = await chat.save();
    res.json(updatedChat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  save,
  remove,
  list,
  getById,
  getByUserId,
  saveMessage,
  removeAMessage,
};
