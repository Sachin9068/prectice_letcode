
const express = require('express');
const userAuth = express.Router();
const {userRegister,userLogin,userLogout} = require('../controller/authentication');
const userMiddleware = require('../Middleware/userMiddleware');



userAuth.post('/register',userRegister);
userAuth.post('/login',userLogin);
userAuth.post('/logout',userMiddleware,userLogout);
// userAuth.get('/',userInfo);

module.exports = userAuth;