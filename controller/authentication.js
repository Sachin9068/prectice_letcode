const validate = require('../utils/validator');
const bcrypt =  require('bcrypt');
const user = require('../Model/user');
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');



const userRegister = async (req,res)=>{
try{
    validate(req.body);
    const {firstName,emailId,password} = req.body;

    req.body.password = await bcrypt.hash(password,10);
     req.body.role = 'user';
    const User = await user.create(req.body);

    // header.payload.signature
    const token = jwt.sign({_id:User._id,emailId:User.emailId,role:'user'}, process.env.JWT_KEY ,{expiresIn:60*60});
    //res.cookie(name, value, [options])
    res.cookie('token',token, {maxAge:60*60*1000});
    res.status(201).send("Resiger Succesfully");

}
catch(err){
    res.status(400).send("Error : "+err);
}

}

const adminRegister =  async (req,res)=>{
try{
    validate(req.body);
    const {firstName,emailId,password} = req.body;

    req.body.password = await bcrypt.hash(password,10);
    const User = await user.create(req.body);

    // header.payload.signature
    const token = jwt.sign({_id:User._id,emailId:User.emailId,role:User.role}, process.env.JWT_KEY ,{expiresIn:60*60});
    //res.cookie(name, value, [options])
    res.cookie('token',token, {maxAge:60*60*1000});
    res.status(201).send("Resiger Succesfully");

}
catch(err){
    res.status(400).send("Error : "+err);
}

}

const userLogin = async (req,res)=>{
 try{
    const {emailId,password} = req.body;

    if(!emailId)
        throw new Error("Missing Credetial");
    if(!password)
        throw new Error("missing credetial");

    const User = await user.findOne({emailId});
    const  match = bcrypt.compare(password,User.password);

    if(!match)
        throw new Error("Invalid Credetial");

    const token = jwt.sign({_id:User._id,emailID:User.emailId,role:User.role},process.env.JWT_KEY,{expiresIn:60*60});
    res.cookie('token',token,{maxAge:60*60*1000});

    res.status(200).send("Login Succefully");
 }
catch(err){
    res.status(400).send("ERROR : "+err);
}
    
    
}

const userLogout = async (req,res)=>{
 try{
      const{token} = req.cookies;
      const payload = jwt.decode(token);
  
        //   await client.set("key", "value");
     await redisClient.set(`token:${token}`,"Blocked");
     await redisClient.expireAt(`token:${token}`,payload.exp);

     res.cookie('token',null,{expires:new Date(Date.now())});
     res.send("Logout Sccuesfully");
    }
 catch(err){
    res.status(500).send("ERRor : "+err);
 }




}

const userInfo = async (req,res)=>{
    
}

module.exports = {userRegister,userLogin,userLogout,adminRegister};