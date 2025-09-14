# 📌 Users Service  
Сервис для работы с пользователями (**Express + PostgreSQL + Sequelize**).  

## 🚀 Возможности
- ✅ Регистрация пользователя  
- 🔑 Авторизация (**JWT**)  
- 👤 Получение пользователя по **ID** (админ или сам пользователь)  
- 📋 Получение списка всех пользователей (**только админ**)  
- ⛔ Блокировка пользователя (админ или сам пользователь)  

## 🛠 Технологии
- **Node.js**  
- **Express.js**  
- **PostgreSQL**  
- **Sequelize ORM**  
- **JWT** для авторизации  
- **bcrypt** для хэширования паролей  

## ⚙️ Конфигурация  
В корне проекта создать файл **`.env`** с переменными:  

```env
DB_HOST=хост_бд
DB_USER=пользователь_бд
DB_PASSWORD=пароль
DB_NAME=имя_бд
DB_PORT=порт_бд
JWT_SECRET=секретный_ключ
📡 Примеры запросов
🔹 Регистрация
POST
http://localhost:5000/users/registration

📥 Тело запроса:

json
Копировать код
{
  "fullName": "Тестовый Тест Тестович",
  "dateOfBirth": "2001.01.01",
  "email": "11@yandex.ru",
  "password": "123",
  "role": "admin"
}
🔹 Аутентификация
POST
http://localhost:5000/users/authorization

📥 Тело запроса:

json
Копировать код
{
  "email": "withotRole@gmail.com",
  "password": "1234"
}
📤 Ответ:
Сервер возвращает JWT-токен.

🔹 Получение пользователя
GET
http://localhost:5000/users/:id

В заголовке:

makefile
Копировать код
Authorization: Bearer <jwt_token>
Админ → может искать любого пользователя

Обычный пользователь → только себя

🔹 Получение всех пользователей (только админ)
GET
http://localhost:5000/users

Заголовок:

makefile
Копировать код
Authorization: Bearer <jwt_token>
🔹 Блокировка пользователя
PATCH
http://localhost:5000/users/:id/ban

Заголовок:

makefile
Копировать код
Authorization: Bearer <jwt_token>
Админ → может блокировать любого пользователя

Пользователь → только себя

🧪 Тестовые данные
Для заполнения БД можно запустить скрипт:

bash
Копировать код
node test/fillDb.js
Скрипт внесет несколько записей пользователей из usersSeed.
