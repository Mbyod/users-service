const jwt = require("jsonwebtoken");
require("dotenv").config();

// проверка авторизации пользователя, его роли
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log(req.headers.authorization);
  if (!token)
    return res
      .status(401)
      .json({ error: "Проблема с авторизационным токеном" });

  try {
    const decodedJwt = jwt.verify(token, process.env.JWT_SECRET); // проверка подписи токена
    req.user = decodedJwt; // добавляем данные из jwt в свойство запроса

    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}

module.exports = authMiddleware;
