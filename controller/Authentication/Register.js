// routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import modelAcceptedUser from "../../models/UserSchema.js";

const routerReg = express.Router();

// POST /api/register
routerReg.post("/reg", async (req, res) => {
  try {
    const {
      firstName,
      secondName,
      email,
      phone,
      altphone,
      password,
      gender,
      dob,
      address,
      role,
      collegeDetails
    } = req.body;

    try {
      const existingUser = await modelAcceptedUser.findOne({ email });
      if (existingUser) {
        return res.status(400).json({status:400, message: "Email already registered" });
      }
    } catch (error) {
      return res.json({status:400,message:error})
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new modelAcceptedUser({
      firstName,
      secondName,
      email,
      phone,
      altphone,
      password: hashedPassword,
      gender,
      dob,
      address,
      role,
      collegeDetails
    });

    // Save to DB
    await newUser.save();

    res.status(201).json({status:201, message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default routerReg;
