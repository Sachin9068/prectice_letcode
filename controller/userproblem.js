const {getLanguageById,submitBatch,submitToken} = require('../utils/problemutils');
const problem = require('../Model/probelm');

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
                return res.status(400).send("Error Occured");
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
    const id = req.params;
    if(!id)
      return res.status(400).send("Id is Missing");

    const result = await findByid(id);
    if(!result)
      return res.status(401).send("Invalid id");

    const{title,dificultylevel,tag,visibletestcase,hiddentestcase,
         startcode,referenceSolution,problemcreator} = req.body;

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
                return res.status(400).send("Error Occured");
             }
            }
 
        }

       

        


        res.status(201).send("Problem update Succesfully..");
        
    }
    catch(err){
          res.status(400).send("Error : "+err);
    }


}

const problemDelete = async (req,res)=>{

}

module.exports = {createProblem,UpdateProblem,problemDelete};

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