const modelAcceptedUser = require("../../models/UserSchema");

const ProfileData=async(req,res)=>{
  try {
    const id=req.user.user._id;
   
    const DataUser=await modelAcceptedUser.findOne({_id:id});
    if(!DataUser){
      return res.status(404).json({status:404,message:"User Not Found"})
    }
    return res.json({status:200,message:"Succesfully retrived the data",DataUser})
  } catch (error) {
    return res.json({status:400,message:"Something went wrong",error});
  }
}
module.exports=ProfileData;
