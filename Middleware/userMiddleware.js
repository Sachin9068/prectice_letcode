const jwt = require('jsonwebtoken');
const user = require('../Model/user');
const redisClient = require('../config/redis');

const userMiddleware = async(req,res,next)=>{
try{
    const {token} = req.cookies;
   if(!token)
    throw new Error("token missing..");

  const payload = jwt.verify(token,process.env.JWT_KEY);
  const {_id} = payload;
  if(!_id)
    throw new Error("Invalid Token");

 const result = await user.findById(_id);
 if(!result)
    throw new Error("User not EXist");

 const IsBlocked = await redisClient.exists(`token:${token}`);
 if(IsBlocked)
    throw new Error("Invalid Token");

 req.result = result;

 next();
  

}
catch(err){
    res.status(401).send("Error : "+err);
}
}

module.exports = userMiddleware;
