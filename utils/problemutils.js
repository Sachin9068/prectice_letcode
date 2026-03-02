
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


module.exports = getLanguageById;