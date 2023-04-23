const express = require('express');
const { login, register, resetPassword } = require('../controller/authentication.controller');
const {check} = require('../middleware/authentication.middleware')
const router = express.Router();

 
router.post('/register', register);
router.post('/', login);
router.post('/reset',check, resetPassword);

module.exports = {
    router
}