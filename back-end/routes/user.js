const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const passwordCheck = require('../middleware/password-validator'); // middleware that verify if the password in creation meets the requirements of the password schema
const limiter = require('../middleware/limiter'); // Middleware to check and block the login attemps to 6

router.post('/signup', passwordCheck, userCtrl.signup);
router.post('/login', limiter, userCtrl.login);

module.exports = router;