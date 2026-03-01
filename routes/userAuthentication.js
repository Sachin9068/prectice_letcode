
const express = require('express');
const userAuth = express();
const {userRegister,userLogin} = require('../controller/authentication');


userAuth.post('/register',userRegister);
userAuth.post('/login',userLogin);
userAuth.post('/logout',userLogout);
userAuth.get('/',userInfo);