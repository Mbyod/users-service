# Users Service

Сервис для работы с пользователями (Express + PostgreSQL + Sequelize).  
Реализованы основные возможности:

- Регистрация пользователя
- Авторизация (JWT)
- Получение пользователя по ID (админ или сам пользователь)
- Получение списка пользователей (только админ)
- Блокировка пользователя (админ или сам пользователь)

## Технологии
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT для авторизации
- bcrypt для хэширования паролей

1. Создать файл .env в корне проекта и заполнить:
-DB_HOST=хост бд
-DB_USER=пользователь бд
-DB_PASSWORD=пароль
-DB_NAME= имя бд
-DB_PORT=порт, на котором запускается бд
-JWT_SECRET=секретный ключ для jwt токена

2. Примеры запросов

#Регистрация
URL: http://localhost:5000/users/registration
Тело запроса: {"fullName": "Тестовый Тест Тестович", "dateOfBirth": "2001.01.01", "email": "11@yandex.ru", "password": "123", "role": "admin"}

#Аутентификация 
URL: http://localhost:5000/users/authorization
Тело запроса: {"email": "withotRole@gmail.com","password":"1234"}
- Сервер возвразает jwt токен

#Получение пользователя  
URL: http://localhost:5000/users/5
В заголовок  Authorization передавать Bearer <jwt_token>
-Админ может выполнять поиск любого id, пользователь - сам себя


#Получение всех пользоватей (Только для админа)
URL: http://localhost:5000/users
В заголовок  Authorization передавать Bearer <jwt_token>
