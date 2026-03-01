const validate = require('../utils/validator');
const bcrypt =  require('bcrypt');
const user = require('../Model/user');
const jwt = require('jsonwebtoken');


const userRegister = async (req,res)=>{

    //validate = entery sahi ki he ki nhi format
try{
    validate(req.body);
    const {firstName,emailId,password} = req.body;

    req.body.password = await bcrypt(password,10);
     req.body.role = 'user';
    const User = await user.create(req.body);

    // header.payload.signature
    const token = jwt.sign({_id:User._id,emailId}, process.env.JWT_KEY ,{expiresIn:60*60});
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

    const token = jwt.sign({_id:User._id,emailID},process.env.JWT_KEY,{expiresIn:60*60});
    res.cookie('token',token,{maxAge:60*60*1000});

    res.status(200).send("Login Succefully");
 }
catch(err){
    res.status(400).send("ERROR : "+err);
}
    
    
}

const userLogout = async (req,res)=>{
    
}

const userInfo = async (req,res)=>{
    
}

module.exports = {userRegister,userLogin}