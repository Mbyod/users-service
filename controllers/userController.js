const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { genHash, comparePassword } = require("../utils/hashPassword");
const authMiddleware = require("../middleware/authMiddleware");
require("dotenv").config();

// Регистрация
async function registration(req, res) {
  try {
    const { fullName, dateOfBirth, email, password, role } = req.body;
    const hash = await genHash(password);
    const user = await User.create({
      fullName: fullName,
      dateOfBirth: dateOfBirth,
      email: email,
      password: hash,
      role: role || "user",
    });

    res
      .status(201)
      .json({ message: "Пользователь зарегистрирован", userId: user.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

//Авторизация
async function authorization(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res
        .status(404)
        .json({ error: "Пользователь с таким email не найден" });
    }

    const isCompare = await comparePassword(password, user.password);
    // console.log(isCompare);
    if (!isCompare) {
      return res.status(401).json({ error: "Непраильный пароль " });
    }

    // jwt token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Получить пользователя по Id
async function getUserbyId(req, res) {
  try {
    const { id } = req.params;
    const options = req.user;
    if (options.role !== "admin" && options.id != id) {
      return res.status(403).json({ error: "Доступ запрещен " });
    }
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    }); // исключаем пароль в выборке

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден " });
    }

    res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Получение всех пользователей

async function getAllUsers(req, res) {
  const options = req.user;
  if (options.role !== "admin") {
    return res.status(403).json({ error: "Доступ запрещен" });
  }
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Блокировка пользователя

async function banUser(req, res) {
  const { id } = req.params;
  const options = req.user;
  console.log(req.user);
  if (options.role !== "admin" && options.id != id)
    return res.status(403).json({ error: "Недостаточно прав" });

  try {
    const user = await User.findByPk(id);
    if (!user)
      return res.status(404).json({ error: "Пользователь не найден " });

    if (user.isActive === false)
      return res.status(409).json({ message: "Пользователь уже заблокирован" });
    user.isActive = false;
    await user.save();
    res.json({ message: `Пользователь ${user.fullName} заблокирован` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  registration,
  authorization,
  getUserbyId,
  getAllUsers,
  banUser,
};
