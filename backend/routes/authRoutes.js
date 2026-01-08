const express = require('express');
const router = express.Router();

const { register, login } = require('../controller/authController');

// Use POST so the controller can read JSON from req.body

router.post('/register', register);

//login router
router.post('/login',login);

module.exports = router;