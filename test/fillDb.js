const sequelize = require("../cfg/db");
const User = require("../models/User");
const users = require("../test/usersSeed");
const { genHash } = require("../utils/hashPassword");
async function fill() {
  try {
    await sequelize.sync({ force: true, alter: true });
    console.log("Подлючение к БД прошло успешное");

    for (const user of users) {
      const { fullName, dateOfBirth, email, password, role, isActive } = user;

      const hash = await genHash(password);

      await User.create({
        fullName,
        dateOfBirth,
        email,
        password: hash,
        role: role,
        isActive: isActive,
      });
    }

    console.log("Таблица заполнена тестовыми данными");
    process.exit(0);
  } catch (error) {
    console.error(error);
  }
}

fill();
