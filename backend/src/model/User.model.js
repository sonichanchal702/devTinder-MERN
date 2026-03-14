const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const validator=require("validator");


const userSchema=new mongoose.Schema(
{
   name:{
      type:String,
      required:true,
      minLength:4,
      maxLength:30

   }, 
   email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      trim:true
   },
   password:{
      type:String,
      required:true,
      select:true,
      resetPasswordToken: String,
      resetPasswordExpire: Date,

   },
   gender:{
      type:String,
        enum: {// enum is typically use for the restricted values or selected values!
          values:["male","female","other"],
          message:`{values} is invalid gender!`
        },

         photoUrl: {
          type: String,
          default: "https://randomuser.me/api/portraits/lego/1.jpg", // ← default photo!
        },


        bio: {
          type: String,
          default: "Hey there! I am using DevTinder 👋",
        },

        
        skills: {
          type: [String], // array of strings
        },
              //OR
            // validate(value){
            // if(!["male", "female","other"].includes(value))
            // {
                  // throw new error("Gender Invalid");
            // }}
     
             }
         },
      // time stamps added after the user schema {} culybraces, and it show the date and time created at defaultly..
         {
      timestamps:true,
   }

);


/* custom changes mannuly in middleware JWT built-in methods :-
 1.getJWT() and 2.validatePassword() from bcrypt and JWT */
userSchema.methods.getJWT=async function(){
   const user=this;
   const token=await jwt.sign({_id:user_id},
   SECRET_KEY,
   {
      expiresIn:"7d",
   });
};

userSchema.methods.validatePassword=async function(passwordInputByUser){
   const user=this;
   const passwordHash=user.password;
   const isPasswordValid= await bcrypt.compare(passwordInputByUser,passwordHash);

   return isPasswordValid;
};
 
//Schema Model 
const User=new mongoose.model("User",userSchema);
module.exports=User;

