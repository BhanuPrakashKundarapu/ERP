const express=require("express");
const Apiread = require("../controller/read");
const RouteRead=express.Router();
RouteRead.get("/readdata",Apiread);
module.exports=RouteRead;