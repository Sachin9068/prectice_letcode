const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const main = require('./config/db');
const userAuth = require('./routes/userAuthentication');
const redisClient = require('./config/redis');


app.use(express.json());
app.use(cookieParser()); 

app.use('/user',userAuth);

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