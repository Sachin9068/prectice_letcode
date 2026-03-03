const axios = require('axios');

const getLanguageById = (lang)=>{
    const language = {
       c:50,
       "c++":54,
       java:62,
       javascript:102,
       python:113,
       typescript:101

    }
    return language[lang.toLowerCase()]
}

const submitBatch = async (submissions)=>{
    
const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    base64_encoded: 'true'
  },
  headers: {
    'x-rapidapi-key': 'b2e33b180amsh96ee72126865d2cp1c5418jsn721a4e31b02e',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    submissions
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

return fetchData();

}


module.exports = {getLanguageById,submitBatch};