const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", userController.registration);
router.post("/authorization", userController.authorization);

router.get("/:id", authMiddleware, userController.getUserbyId);
router.get("/", authMiddleware, userController.getAllUsers);

router.patch("/:id/ban", authMiddleware, userController.banUser);

module.exports = router;
