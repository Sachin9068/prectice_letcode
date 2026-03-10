
const problem = require('../Model/probelm');
const Submition = require('../Model/submition');
const {getLanguageById,submitBatch,submitToken} = require('../utils/problemutils');

const SubmitCode = async (req,res)=>{

    try{
        const userid = req.result._id;
        const problemid = req.params.id;

        const {code,language} = req.body

        if(!userid||!problemid||!code||!language)
            return res.status(400).send("Some Filds missing");

        const problems = await problem.findById(problemid);

         //   firstly store user resposne
        const storeResult = await Submition.create({
            userid,
            problemid,
            code,
            language,
            status:'In Queue',
            totaltestcase : problems.hiddentestcase.length
        }) 

        // send judge0

        const languageId = getLanguageById(language);

        const submission = problems.hiddentestcase.map((testcase)=>({
                        source_code:code,
                        language_id:languageId,
                        stdin:testcase.input,
                        expected_output:testcase.output
        
                    }));


            const submitResult = await submitBatch(submission);

            const resulttoken = submitResult.map((value)=>value.token);

  
            const testresult = await submitToken(resulttoken);

            let testcase = 0;
            let errmsg = null;
            let memory = 0;
            let runtime = 0;
            let status = 'Accepted';

            for(test of testresult){
                if(test.status_id==3){
                    testcase++;
                    runtime=runtime + parseFloat(test.time);
                    memory=Math.max(memory,test.memory);
                }
                else{
                    if(test.status_id==4){
                        status = 'Wrong Answer';
                        errmsg = test.stderr;
                    }
                    else{
                        status = 'Runtime Error (Other)';
                        errmsg = test.stderr;
                    }
                }
            }

            storeResult.status = status;
            storeResult.runtime = runtime;
            storeResult.memory = memory;
            storeResult.errmsg = errmsg;
            storeResult.testcasepassed = testcase;
         
            await storeResult.save();

         if (!req.result.problemSolution.includes(problemid)) {
            req.result.problemSolution.push(problemid);
            await req.result.save();
            }

            res.status(201).send(storeResult);

    }
    catch(err){
       res.status(500).send('Submit Error : '+err);
    }

}

const RunCode = async (req,res)=>{
     try{
        const userid = req.result._id;
        console.log(userid);
        const problemid = req.params.id;

        const {code,language} = req.body

        if(!userid||!problemid||!code||!language)
            return res.status(400).send("Some Filds missing");

        const problems = await problem.findById(problemid);
        // send judge0

        const languageId = getLanguageById(language);

        const submission = problems.visibletestcase.map((testcase)=>({
                        source_code:code,
                        language_id:languageId,
                        stdin:testcase.input,
                        expected_output:testcase.output
        
                    }));


            const submitResult = await submitBatch(submission);

            const resulttoken = submitResult.map((value)=>value.token);

            const testresult = await submitToken(resulttoken);

            res.status(201).send(testresult);

    }
    catch(err){
       res.status(500).send('Run Error : '+err);
    }
}

module.exports = {SubmitCode,RunCode};


//     language_id: 54,
//     stdin: '2 3',
//     expected_output: '5',
//     stdout: '5',
//     status_id: 3,
//     created_at: '2025-05-12T16:47:37.239Z',
//     finished_at: '2025-05-12T16:47:37.695Z',
//     time: '0.002',
//     memory: 904,
//     stderr: null,
//     token: '611405fa-4f31-44a6-99c8-6f407bc14e73',