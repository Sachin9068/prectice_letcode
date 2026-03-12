const {getLanguageById,submitBatch,submitToken} = require('../utils/problemutils');
const problem = require('../Model/probelm');
const User = require('../Model/user');
const Submition = require('../Model/submition');

const createProblem = async(req,res)=>{
    const{title,dificultylevel,tag,visibletestcase,hiddentestcase,
         startcode,referenceSolution,problemcreator} = req.body;

    const id = ["In Queue","Processing","Accepted","Wrong Answer","Time Limit Exceeded","Compilation Error","Runtime Error (SIGSEGV)","Runtime Error (SIGXFSZ)","Runtime Error (SIGFPE)","Runtime Error (SIGABRT)",
             "Runtime Error (NZEC)","Runtime Error (Other)","Internal Error","Exec Format Error"];

    try{

        for(const {language,completecode} of referenceSolution){

            const languageId = getLanguageById(language);
        

            const submission = visibletestcase.map((testcase)=>({
                source_code:completecode,
                language_id:languageId,
                stdin:testcase.input,
                expected_output:testcase.output

            }));

         


            const submitResult = await submitBatch(submission);

            const resulttoken = submitResult.map((value)=>value.token);

            
            const testresult = await submitToken(resulttoken);
            // console.log(testresult);

           for(const test of testresult){
            if(test.status_id!=3){
                return res.status(400).send(id[test-1]);
             }
            }
 
        }

        await problem.create({
            ...req.body,
            problemCreator: req.result._id
        })

        res.status(201).send("Problem create Succesfully..");
        
    }
    catch(err){
          res.status(400).send("Error : "+err);
    }
}


const UpdateProblem = async (req,res)=>{
    

    const{title,dificultylevel,tag,visibletestcase,hiddentestcase,
         startcode,referenceSolution,problemcreator} = req.body;

    try{

    const {id} = req.params;
    if(!id)
      return res.status(400).send("Id is Missing");

    const DsaProblem = await problem.findById(id);
    if(!DsaProblem)
      return res.status(401).send("DsaProblem not present");

        for(const {language,completecode} of referenceSolution){

            const languageId = getLanguageById(language);
        

            const submission = visibletestcase.map((testcase)=>({
                source_code:completecode,
                language_id:languageId,
                stdin:testcase.input,
                expected_output:testcase.output

            }));

            const submitResult = await submitBatch(submission);
            const resulttoken = submitResult.map((value)=>value.token);

            
            const testresult = await submitToken(resulttoken);
            // console.log(testresult);

           for(const test of testresult){
            if(test.status_id!=3){
                return res.status(400).send("Error Occured");
             }
            }
 
        }

         //Model.findByIdAndUpdate(id, updateData, options)
       const newProblem = await problem.findByIdAndUpdate(id,{...req.body},{runValidators:true,new:true});
        res.status(201).send(newProblem + "Problem update Succesfully..");
        
    }
    catch(err){
          res.status(400).send("Error : "+err);
    }


}

const problemDelete = async (req,res)=>{
 const {id} = req.params;
  try{
       if(!id)
        return res.status(404).send("Problem id Not Found");
      //Model.findByIdAndDelete(id, options)
      const IsDelete = await problem.findByIdAndDelete(id);
      if(!IsDelete){
        return res.status(404).send("Problem not Delete");
      }

      res.status(201).send("Problem Deleted Succesfully");
  }
  catch(err){
     res.status(500).send("Problem Delete Error : "+err);
  }

}

const fetchInfoById = async(req,res)=>{
 
  const {id} = req.params;
  try{
       if(!id)
        return res.status(404).send("missing id");

       const getProblem = await problem.findById(id).select('_id title dificultylevel tag visibletestcase startcode referenceSolution');
       if(!getProblem)
        return res.status(404).send("missing problem");

       res.status(201).send(getProblem);
  }
  catch(err){
    res.status(500).send("Fetch by id Error : "+err);
  }

} 

const fetchAllProblem = async (req,res)=>{

 try{
    const getproblems = await problem.find({}).select('_id title dificultylevel tag');
    if(getproblems.length == 0)
      return res.status(404).send("problem not fetch");

    res.status(201).send(getproblems);
 }
 catch(err){
  res.status(500).send("fatchAllinfo Error : "+err);
 }

}

const solvedAllProblem = async (req,res)=>{
  try{

    const userid = req.result._id;
    const user = await User.findById(userid).populate({
   path: "problemSolution",
   select: "_id title dificultylevel tag"
})
    res.status(201).send(user);


  }
  catch(err){
    res.status(500).send("SolvedALlProblem Error: "+err);
  }
}

const submittedProblem = async (req,res)=>{
       
     try{

      const userid = req.result._id;
      const problemid = req.params.id;
      const ans = await Submition.find({userid, problemid});
     if(ans.length==0)
    res.status(200).send("No Submission is persent");

  res.status(200).send(ans);
    
    }
     catch(err){
      res.status(500).send("SubmitProblem Error : "+err);
     }

}


module.exports = {createProblem,UpdateProblem,problemDelete,fetchInfoById,fetchAllProblem,solvedAllProblem,submittedProblem};

/* 
{
  "title": "Add Two Numbers",
  "dificultylevel": "easy",
  "tag": "normal",
  "visibletestcase": [
    {
      "input": "2 3",
      "output": "5",
      "explantion": "2 + 3 = 5"
    }
  ],
  "hiddentestcase": [
    {
      "input": "10 20",
      "output": "30"
    },
    {
      "input": "100 200",
      "output": "300"
    },
    {
      "input": "0 0",
      "output": "0"
    }
  ],
  "startcode": [
    {
      "language": "python",
      "initialcode": "def add_two_numbers(a, b):\n    # Write your code here\n    pass"
    },
    {
      "language": "java",
      "initialcode": "public class Solution {\n    public int addTwoNumbers(int a, int b) {\n        // Write your code here\n        return 0;\n    }\n}"
    },
    {
      "language": "cpp",
      "initialcode": "int addTwoNumbers(int a, int b) {\n    // Write your code here\n    return 0;\n}"
    }
  ],
  "referenceSolution": [
    {
      "language": "python",
      "completecode": "def add_two_numbers(a, b):\n    return a + b"
    },
    {
      "language": "java",
      "completecode": "public class Solution {\n    public int addTwoNumbers(int a, int b) {\n        return a + b;\n    }\n}"
    },
    {
      "language": "cpp",
      "completecode": "int addTwoNumbers(int a, int b) {\n    return a + b;\n}"
    }
  ]
}
*/