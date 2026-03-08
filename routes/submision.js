const express = require('express');
const submitRoute = express.Router();
const userMiddleware = require('../Middleware/userMiddleware');
const userSubmit  = require('../controller/userSubmision');

submitRoute.post('/submit/:id',userMiddleware,userSubmit);