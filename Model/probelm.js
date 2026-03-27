const mongoose = require('mongoose');
const {Schema} =require('mongoose');

const problemSchema = mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    dificultylevel:{
        type:String,
        enum:['easy','medium','hard'],
        required:true
    },
    tag:{
        type:String,
        required:true,
        enum:['array','tree','dynamicprograming','linklist']
    },
    visibletestcase:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            },
            explantion:{
                type:String,
                required:true
            }
        }
    ],
    hiddentestcase:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            }
        }
    ],
    startcode:[
        {
            language:{
                type:String,
                required:true
            },
            initialcode:{
                type:String,
                required:true
            }
        }
    ],
    referenceSolution:[
        {
            language:{
                type:String,
                required:true
            },
            completecode:{
                type:String,
                required:true
            }
        }
    ],
    problemCreator:{
        type:Schema.Types.ObjectId,
        ref:'User',
    required: true
    }

},{timeStamp:true});

const problem = mongoose.model('problem',problemSchema);

module.exports = problem;

