import express from "express";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken"

const userRoutes = express.Router()

//TODO expireIn 60day is just bsc of production (1,2h is normall)
// id for a user token
const genToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '60d' })
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
            token: genToken(user._id)
        })
    } else {
        // * bcs of the async handler this go directly to the frontend
        res.status(401)
        throw new Error("Invalid email or pw")
    }
})

// register user 
const registerUser = asyncHandler(async(req,res) => {
    const {name,email,password} = req.body

    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error ("We are already have an account with that email address.")
    }

    const user = await User.create({
        email, 
        name,
        password
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genToken(user._id)
        })
    } else {
        res.json(400) 
        throw new Error("Invalid user data")
    }
})

// ! ============== ROUTES ===================
userRoutes.post("/login", loginUser)
userRoutes.post("/register", registerUser)

export default userRoutes