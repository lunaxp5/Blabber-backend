const User = require("../models/user");
const validation = require("../utils/validations");

const getUserByEmail = async (req, res) => {
  const { email } = req.body;

  if (!validation.email(email)) {
    res.status(400).json({ message: "Correo no válido" });
    return;
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: "Correo no encontrado" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const save = async (req, res) => {
  const { name, email } = req.body;

  if (!validation.email(email)) {
    res.status(400).json({ message: "Correo no válido" });
    return;
  }

  const user = User({
    name,
    email,
  });
  try {
    const userSaved = await user.save();
    res.json(userSaved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const list = async (req, res) => {
  try {
    const userList = await User.find();
    res.json(userList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const someUser = async (userList) => {
  for (let uid of userList) {
    if (!validation.isValidObjectId(uid)) {
      return false;
    }

    const user = await User.findById(uid);
    if (user === null) {
      return false;
    }
  }
  return true;
};

module.exports = {
  save,
  list,
  someUser,
  getUserByEmail,
};
