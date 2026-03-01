const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:25
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    age:{
        type:Number,
        min:6,
        max:80
    },
    role:{
       type:String,
       enum:[user,admin],
       default:user
    },
    problemSolution:{
       type:[String]
    },
    password:{
       type:String,
       required:true,
       minLength:6
    }

},{timeStamp:true});

const User = mongoose.model('User',userSchema);

module.exports = User;
