const {getLanguageById,submitBatch} = require('../utils/problemutils');

const createProblem = async(req,res)=>{
    const{title,dificultylevel,tag,visibletestcase,hiddentestcase,startcode,referenceSolution,problemcreator} = req.body;

    try{

        for(const {language,completecode} of referenceSolution){
            const languageId = getLanguageById(language);

            const submission = visibletestcase.map((testcase)=>({
                source_code:completecode,
                language_id:languageId,
                stdin:testcase.input,
                expected_output:testcase.output

            }));

            const submitResult = submitBatch(submission);

            
        }
    }
    catch(err){

    }
}