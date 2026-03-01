
const express = require('express');
const userAuth = express();


userAuth.post('/register',userRegister);
userAuth.post('/login',userLogin);
userAuth.post('/logout',userLogout);
userAuth.get('/',userInfo);