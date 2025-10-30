require("dotenv").config()
const mongoose=require("mongoose");
try {
  const URI=process.env.MONGO_URI
  if(!URI){
    console.log("can't get the connection")
  }
  mongoose.connect(URI).then((res)=>{
    console.log("Database Connected Successfully")
  }).catch(err=>{
    console.log(err);
  })
} catch (error) {
  console.log(error)  
}
module.exports=mongoose;