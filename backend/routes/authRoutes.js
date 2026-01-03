const express = require('express');
const router = express.Router();

const { register, login } = require('../controller/authController');

// Use POST so the controller can read JSON from req.body
// Mounted at /api/register in index.js, so POST /api/register will register
router.post('/register', register);

//login router
router.post('/login',login);

module.exports = router;