const validator = require('validator');


const validate = (data)=>{
  
    const mendorteryfilds = ["firstName","emailId","password"];

    const IsAllowed = mendorteryfilds.every((k)=>Object.keys(data).includes(k));

    if(!IsAllowed)
        throw new Error("Some Fields Missing");
    if(!validator.isEmail(data.emailId))
        throw new Error("Invalid Crenditial");
    if(!validator.isStrongPassword(data.password))
        throw new Error("Invalid Credetial");

}

module.exports = validate;