const express = require('express');
const probleRoute = express.Router();


probleRoute.post('/create',createProblem);
probleRoute.patch('/:id',UpdateProblem);
probleRoute.delete('/:id',problemDelete);

probleRoute.get('/:id',fetchInfoById);
probleRoute.get('/',fetchAllProblem);
