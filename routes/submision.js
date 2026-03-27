const submitRoute = require("express").Router();
const userMiddleware = require('../Middleware/userMiddleware');
const {SubmitCode,RunCode,FetchSubmitCode}  = require('../controller/userSubmision');

submitRoute.post('/submit/:id',userMiddleware,SubmitCode);
submitRoute.post('/run/:id',userMiddleware,RunCode);
submitRoute.get('/submit/:id',userMiddleware,FetchSubmitCode)

module.exports = submitRoute;


