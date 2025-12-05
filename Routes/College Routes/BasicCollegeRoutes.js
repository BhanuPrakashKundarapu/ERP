const express=require("express");
const { CreatingCollege } = require("../../controller/CollegeBasix/CreatingCollege");
const CollegeRoute=express.Router();
CollegeRoute.post("/collegec",CreatingCollege);
module.exports=CollegeRoute;