const express = require("express");
const modelAcceptedUser = require("../../models/UserSchema");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const bcj=require("bcryptjs")
const login = async (req, res) => {
	// res.json({status:400,message:"iam ready",some:"gdsadaguidasukdsahuo"})
	try {
		console.log(req);
		// return 0;
		const { email, password } = req.body;
		if (!email || !password) {
			return res
				.status(400)
				.json({ status: 400, message: "all fields are required" });
		}
		const UserFind = await modelAcceptedUser.findOne({ email: email });
		if (!UserFind) {
			return res.json({
				status: 400,
				message: "user not found please check the password",
			});
		}
		const passwordMatch = await bcj.compare(password,UserFind.password);
    if(!passwordMatch){
      return res.json({status:400,message:'password incorrect'})
    }
		if (!passwordMatch) {
			return res.json({ status: 400, message: "invalid password" });
		}
		const payload = {
			user: {
				_id: UserFind._id,
			},
		};
		JWT.sign(payload, process.env.ENV_TOKEN,{expiresIn:"1d"}, (err, token) => {
			if (err) {
				return res.json({ status: 400, message: "Something went wrong", err });
			}
			res.json({ status: 200, message: "Login Successfull", token,tokenTime:"24hours",isActive:true});
		});
	} catch (error) {
    console.log(error)
		return res.json({
			status: 400,
			message: "connection error",
			error,
			lin: 33,
			loc: "login",
		});
	}
};
module.exports = login;
