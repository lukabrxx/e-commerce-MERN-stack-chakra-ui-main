import express from "express"
import Product from "../models/Product.js"
const productRoutes = express.Router()

//get all products
const getProducts = async(req,res) => {
    const products = await Product.find({})
    res.json(products)
}

// get one product
const getProduct = async(req,res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error("Product not found.")
    }
}




// routes 
productRoutes.get("/", getProducts)
productRoutes.get("/:id", getProduct)

export default productRoutes