import express from "express"
import Product from "../models/Product.js"
const productRoutes = express.Router()

//get all products
const getProducts = async(req,res) => {
    const products = await Product.find({})
    res.json(products)
}




// routes 
productRoutes.get("/", getProducts)

export default productRoutes