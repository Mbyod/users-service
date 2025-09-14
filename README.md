# Users Service

Сервис для работы с пользователями (Express + PostgreSQL + Sequelize).

## Возможности
- Регистрация пользователя  
- Авторизация (JWT)  
- Получение пользователя по ID (админ или сам пользователь)  
- Получение списка пользователей (только админ)  
- Блокировка пользователя (админ или сам пользователь)  

---

## Технологии
- Node.js  
- Express.js  
- PostgreSQL  
- Sequelize ORM  
- JWT для авторизации  
- bcrypt для хэширования паролей  

---

## Настройка окружения
Создайте файл `.env` в корне проекта и укажите переменные:

```env
DB_HOST=хост_бд
DB_USER=пользователь_бд
DB_PASSWORD=пароль
DB_NAME=имя_бд
DB_PORT=порт_бд
JWT_SECRET=секретный_ключ
```
## Примеры запросов
- Регистрация пользователя
`POST http://localhost:5000/users/registration`

Body (JSON):

```
{
  "fullName": "Тестовый Тест Тестович",
  "dateOfBirth": "2001.01.01",
  "email": "11@yandex.ru",
  "password": "123",
  "role": "admin"
}
```

- Аутентификация
`POST http://localhost:5000/users/authorization`

Body (JSON):

```
{
  "email": "withotRole@gmail.com",
  "password": "1234"
}
```
В ответ сервер вернёт JWT токен.

- Получение пользователя по ID
`GET http://localhost:5000/users/:id`

Headers:
```
Authorization: Bearer <jwt_token>
```
Админ может получить данные любого пользователя
Пользователь может получить только свои данные

- Получение всех пользователей (только админ)
`GET http://localhost:5000/users`

Headers:
```
Authorization: Bearer <jwt_token>
```

- Блокировка пользователя
`PATCH http://localhost:5000/users/:id/ban`

Headers:
```
Authorization: Bearer <jwt_token>
```
Админ может блокировать любого пользователя
Пользователь может блокировать только себя

---

## Тестовые данные
Для наполнения базы тестовыми пользователями выполните скрипт:
`node test/fillDb.js`
Данные берутся из usersSeed

---

## Запуск проекта
1. Установить зависимости:
 ``` npm install```
2. Запустить сервер:
 ``` npm start```

