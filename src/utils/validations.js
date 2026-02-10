const validator=require("validator");
const validateSignupData=(req)=>{
    const {name, email, password}=req.body;
    if(!name)
    {
        throw new Error("Name should be Valid");

    }else if(!validator.isEmail(email))
    {
        throw new Error("Email should be valid!");

    }else if(!validator.isStrongPassword(password)){
        
        throw new Error("Please Enter the Strong Password!");
    }
};
module.exports={validateSignupData};
