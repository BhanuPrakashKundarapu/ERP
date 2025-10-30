const modelAcceptedUser = require("../models/UserSchema");

const Apiread=async(req,res)=>{
  try {
    const data =await modelAcceptedUser.find({});
    res.json({status:200,data});
  } catch (error) {
    return res.json({status:400,message:"connection error",error});
  }
}
module.exports=Apiread