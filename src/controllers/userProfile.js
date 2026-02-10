const User = require("../model/User.model");

const profile= async(req ,res)=>
{ try{
      const user=await User.findById(req.userId);
      res.send(user);
  }catch(err){
     res.status(400).send("Erraor:" + err.message);
  }
};

module.exports={profile};


