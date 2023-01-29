import express from "express";
import User from "../models/User";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken"
import { genSalt } from "bcryptjs";

const router = express.Router()

//TODO expireIn 60day is just bsc of production (1,2h is normall)
// id for a user token
const getToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {expireIn:"60d"})
}
// login user 
const loginUser = asyncHandler(async(req,res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    // * pw from user schema methods.matchPassword
    if(user && (await user.matchPasswords(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genSalt(user._id)
        })
    } else {
        // * bcs of the async handler this go directly to the frontend
        res.status(401)
        throw new Error("Invalid email or pw")
    }
})