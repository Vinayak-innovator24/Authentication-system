const express = require('express');
const { login, register, resetPassword, updateDetails, getDetails} = require('../controller/authentication.controller');
const {check} = require('../middleware/authentication.middleware')
const router = express.Router();

 
router.post('/register', register);
router.post('/login', login);
router.post('/reset',check, resetPassword);
router.post('/update', check, updateDetails);
router.get('/', check, getDetails);

module.exports = {
    router
}