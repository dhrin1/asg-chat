const express = require('express');
const { registerUser, authUser, getUsers } = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route("/").post(registerUser).get(protect, getUsers)
router.post("/login", authUser);

module.exports = router;