const express=require("express");
const cors=require("cors");
const Route = require("./Routes/Authentication");
const RouteRead = require("./Routes/ReadData");
require("./Config/Database");
const app=express();
app.use(cors());
app.use(express.json())
app.get("/",async(req,res)=>{
  res.send("server is working")
})
app.get("/post",async(req,res)=>{
  res.send("from post method")
})
app.use("/Auth",Route);
app.use("/Read",RouteRead);

app.listen(9090,()=>{
  console.log("server is running on http://localhost:"+9090);
})
