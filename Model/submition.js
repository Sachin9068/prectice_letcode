const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const submition = mongoose.Schema({
    userid:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    problemid:{
        type:Schema.Types.ObjectId,
        ref:'problem',
        required:true
    },
    code:{
        type:String,
        required:true
    },
    language:{
        type:String,
        enum:['c','cpp','java','javascript','python','typescript'],
        required:true
    },
    status:{
        type:String,
        enum:["In Queue","Processing","Accepted","Wrong Answer","Time Limit Exceeded","Compilation Error","Runtime Error (SIGSEGV)","Runtime Error (SIGXFSZ)","Runtime Error (SIGFPE)","Runtime Error (SIGABRT)",
             "Runtime Error (NZEC)","Runtime Error (Other)","Internal Error","Exec Format Error"],
        required:true
    },
    runtime:{
        type:Number,  //milisecond
        

    },
    memory:{
        type:Number ,  //kb
    
    },
    errmsg:{
        type:String,
        default:''
    },
    testcasepassed:{
        type:Number,
        
    },
    totaltestcase:{
        type:Number,
       
    }

},{timestamps: true})

submition.index({
    userid:1,
    problemid:1
})

const Submition = mongoose.model('Submition',submition);
module.exports = Submition;