const mongoose=require("mongoose");

const connectDB=async()=>{
   try{
   await mongoose.connect("mongodb://127.0.0.1:27017/devtinder");
         console.log("db connected successfullyy");
   }catch(error){
      console.log("db not connect X !",error.message);
   }
}
module.exports=connectDB;