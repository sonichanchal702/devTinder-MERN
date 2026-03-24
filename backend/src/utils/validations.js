const validator=require("validator");
const validateSignupData=(req)=>{
    const {firstName, lastName, email, password}=req.body;
    if(!firstName || !lastName)
    {
        throw new Error("First Name and Last Name should be Valid");

    }else if(!validator.isEmail(email))
    {
        throw new Error("Email should be valid!");

    }else if(!validator.isStrongPassword(password)){
        
        throw new Error("Please Enter the Strong Password!");
    }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName", 
    "age",
    "about",
    "photoUrl",
    "skills",
    "gender",
  ];

    const isAllowedEdit= Object.keys(req.body).every(feild=>
    allowedEditFields.includes(feild)
    );
    return isAllowedEdit;
};

module.exports={validateSignupData, validateEditProfileData};
