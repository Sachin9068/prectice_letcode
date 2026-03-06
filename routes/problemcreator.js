const express = require('express');
const probleRoute = express.Router();
const {createProblem,UpdateProblem,problemDelete} = require('../controller/userproblem');
const adminMiddlware = require('../Middleware/adminMiddlware');


probleRoute.post('/create',adminMiddlware,createProblem);
probleRoute.patch('update/:id',adminMiddlware,UpdateProblem);
probleRoute.delete('delete/:id',adminMiddlware,problemDelete);

probleRoute.get('/:id',fetchInfoById);
probleRoute.get('/',fetchAllProblem);

module.exports = probleRoute;
