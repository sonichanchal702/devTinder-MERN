const express=require("express");
const app=express();

app.use(express.json());
app.get("/",(req,res)=>
{
console.log("Server is on home page");
res.send("WELCOME from node js!!");
});

app.get("/about",(req,res)=>{
    console.log("navigate to the about page");
    res.send("THIS IS ABOUT PAGE!!!");
});
app.listen(8080,()=>{
    console.log("server is listening on the port 8080");
});