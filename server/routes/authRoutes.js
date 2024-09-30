const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/authController.js');
const { protect } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUser);

module.exports = router;
