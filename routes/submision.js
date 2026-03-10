const submitRoute = require("express").Router();
const userMiddleware = require('../Middleware/userMiddleware');
const {SubmitCode,RunCode}  = require('../controller/userSubmision');

submitRoute.post('/submit/:id',userMiddleware,SubmitCode);
submitRoute.post('/run/:id',userMiddleware,RunCode);

module.exports = submitRoute;


