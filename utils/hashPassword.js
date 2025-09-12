const bcrypt = require("bcrypt");

const saltRounds = 10;

// генерация хеша из пароля
async function genHash(password) {
  return await bcrypt.hash(password, saltRounds);
}

// сравненение хеша пароля с введеным паролем
async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
module.exports = { genHash, comparePassword };
