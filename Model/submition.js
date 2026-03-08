const mongoose = require('mongoose');
const {schema} = require('mongoose');

const submition = mongoose.schema({
    userid:{
        type:Schema.Types.ObjectId,
        ref:'User',
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
        required:true
    },
    memory:{
        type:Number ,  //kb
        required:true
    },
    errmsg:{
        type:String,
        default:''
    },
    testcasepassed:{
        type:Number,
        required:true
    },
    totaltestcase:{
        type:Number,
        required:true
    }

},{timestamps: true})

const Submition = mongoose.model('Submition',submition);
module.exports = Submition;