const login = require("../controller/Authentication/Login");
const { default: routerReg } = require("../controller/Authentication/Register");
const ProfileData = require("../controller/ProfileManagement/Profile");
const passport = require("../middlewares/Passport");
const validateCredentials = require("../Validators/AuthValidators/LoginValidators");
const validateRegister = require("../Validators/AuthValidators/RegisterValidator");

const Route = require("express").Router();
Route.post("/log", validateCredentials, login);
Route.post("/reg", validateRegister, routerReg);
Route.get ("/profile", passport, ProfileData);
module.exports = Route;

// const res = {
// 	firstName: "Arun",
// 	secondName: "Kashyap",
// 	email: "arun.kashyap@erpcollege.com",
// 	phone: "9876543246",
// 	altphone: "9876543247",
// 	password: "Student@111",
// 	gender: "Male",
// 	dob: "2003-05-18",
// 	address: {
// 		line1: "15 Hilltop Colony",
// 		city: "Delhi",
// 		state: "Delhi",
// 		pincode: "110034",
// 	},
// 	role: "student",
// 	collegeDetails: {
// 		collegeName: "Global Tech College",
// 		collegeCode: "GTC001",
// 		department: "Electrical",
// 		joiningDate: "2021-09-01",
// 	},
// };
