const express = require("express");
const sequelize = require("./cfg/db");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

// парсинг json
app.use(express.json());
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;

// alter - изменяет структуру таблиц, подстраивая под модели force - перезапись всех таблиц
// попытка подключения к бд, после чего запускаем сервер
sequelize.sync({ alter: true, force: false }).then(() => {
  console.log("Подключение к БД прошло успешно");
  app.listen(PORT, () =>
    console.log(`Сервер запущен на http://localhost:${PORT}`)
  );
});
