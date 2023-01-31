import express from "express";
import User from "../models/User.js";
import Order from "../models/Order.js"
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken"
import protectRoute from "../middleware/authMiddleware.js"

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
            token: genToken(user._id),
            createdAt: user.createdAt
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

// update user profile
const updateUserProfile = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id)

    // ? if we didnt change zb. name that it takes old one (||)
    if(user) {
        user.name = req.body.name || user.name 
        user.email = req.body.email || user.email 
        if(req.body.password) {
            user.password = req.body.password
        }

        const updateUser = await user.save()

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: genToken(updateUser._id),
            createdAt: updateUser.createdAt,
        })
    } else {
        res.status(404)
        throw new Error("User not found.")
    }
})

// user orders 
const getUserOrders = asyncHandler(async(req,res) => {
    const orders = await Order.find({user: req.params.id})
    if(orders) {
        res.json(orders) 
    } else {
        res.status(404)
        throw new Error("No orders found")
    }

})

// ! ============== ROUTES ===================
    //* put is to update req 
    //* post to create something new 
    //* get fetch data from api
    //? protecteRoute is auth, updateUserProfile is update function (We can have multiple functions in route)
userRoutes.post("/login", loginUser)
userRoutes.post("/register", registerUser)
userRoutes.put("/profile/:id", protectRoute, updateUserProfile)
userRoutes.get("/:id", protectRoute, getUserOrders)
export default userRoutes
