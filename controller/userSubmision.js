const problem = require('../Model/probelm');
const Submition = require('../Model/submition');
const {getLanguageById,submitBatch,submitToken} = require('../utils/problemutils');

const userSubmit = async (req,res)=>{

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
            status:'panding',
            totaltestcase:problem.hiddentestcase.lenght
        })

        // send judge0

        const languageId = getLanguageById(language);

        const submission = visibletestcase.map((testcase)=>({
                        source_code:code,
                        language_id:languageId,
                        stdin:testcase.input,
                        expected_output:testcase.output
        
                    }));


            const submitResult = await submitBatch(submission);

            const resulttoken = submitResult.map((value)=>value.token);

            
            const testresult = await submitToken(resulttoken);

    }
    catch(err){

    }

}


module.exports = {userSubmit};