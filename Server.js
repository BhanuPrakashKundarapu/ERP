const express=require("express");
const cors=require("cors");
const app=express();

app.get("/",async(req,res)=>{
  res.send("server is working")
})


app.listen(9090,()=>{
  console.log("server is running on http://localhost:"+9090);
})
