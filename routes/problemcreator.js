const express = require('express');
const probleRoute = express.Router();
const {createProblem,UpdateProblem,problemDelete,fetchInfoById,fetchAllProblem} = require('../controller/userproblem');
const adminMiddlware = require('../Middleware/adminMiddlware');
const userMiddleware = require('../Middleware/userMiddleware');


probleRoute.post('/create',adminMiddlware,createProblem);
probleRoute.patch('/update/:id',adminMiddlware,UpdateProblem);
probleRoute.delete('/delete/:id',adminMiddlware,problemDelete);

probleRoute.get('/:id',userMiddleware,fetchInfoById);
probleRoute.get('/',userMiddleware,fetchAllProblem);

module.exports = probleRoute;
