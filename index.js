const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const main = require('./config/db');
const userAuth = require('./routes/userAuthentication');
const redisClient = require('./config/redis');
const probleRoute = require('./routes/problemcreator');
const submitRoute = require('./routes/submision');
const cors = require('cors')

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}))


app.use(express.json());
app.use(cookieParser()); 

app.use('/user',userAuth);
app.use('/problem',probleRoute);
app.use('/submission',submitRoute)


const startServer = async ()=>{

    try{
         await Promise.all([main(),redisClient.connect()]);
         console.log("db connect...");

         app.listen(process.env.PORT,()=>{
            console.log("Server Listning....");
         })
    }
    catch(err){
        console.log("Error : "+err);
    }

}

startServer();