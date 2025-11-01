const jwt=require("jsonwebtoken");
require("dotenv").config();
const passport=async(req,res,next)=>{
  try {
    console.log(req.headers)
    console.log(req.headers['x-token'],5,"passport");
    const token=req.headers['x-token'];
    if(!token){
      return res.status(401).json({status:401,message:"Unauthorized Access"})
    }
    const decoded=jwt.verify(token,process.env.ENV_TOKEN);
    req.user=decoded;
    console.log(req.user)
    next();
  } catch (error) {
    return res.status(401).json({status:401,message:"Unauthorized Access"})
  }
}
module.exports=passport;