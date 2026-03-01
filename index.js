const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');

const main = require('./config/db');


app.use(express.json());
app.use(cookieParser()); 

const startServer = async ()=>{

    try{
         await main();
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