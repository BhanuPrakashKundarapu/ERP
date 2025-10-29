const mongoose=require("mongoose");
const UserSchema=mongoose.Schema({
  firstName:{
    type:String,
    required:true
  },
  secondName:{
    type:String,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  phone:{
    type:String,
    required:true,
  },
  altphone:{  // parents number if they're student
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  dob: { type: Date },
  address: {
    line1: { type: String },
    line2: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
  },
  role: {
    type: String,
    enum: [
      "super_admin",
      "college_admin",
      "director",
      "principal",
      "hod",
      "mentor",
      "faculty",
      "student",
      "parent"
    ],
    required: true,
  },
  collegeDetails: {
    collegeName: { type: String },
    collegeCode: { type: String },
    department: { type: String },
    designation: { type: String },
    joiningDate: { type: Date },
  },
  profileImage: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})


const modelAcceptedUser=mongoose.model("UsersData",UserSchema);
module.exports=modelAcceptedUser;