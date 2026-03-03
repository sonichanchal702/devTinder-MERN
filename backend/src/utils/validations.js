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

const validateEditProfileData=(req)=>{
    const allowedEditFields=["name, email, password, gender"]; // allowed editing to the given elements in arr

    const isAllowedEdit= Object.keys(req.body).every(feild=>
    allowedEditFields.includes(feild)
    );
    return isAllowedEdit;
};

module.exports={validateSignupData, validateEditProfileData};
