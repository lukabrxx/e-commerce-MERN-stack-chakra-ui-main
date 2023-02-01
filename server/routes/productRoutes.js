import express from 'express'
import Product from '../models/Product.js'
import User from '../models/User.js'
import asyncHandler from 'express-async-handler'
import {protectRoute, admin} from '../middleware/authMiddleware.js'

const productRoutes = express.Router()

//get all products
const getProducts = async (req, res) => {
  const products = await Product.find({})
  res.json(products)
}

// get one product
const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found.')
  }
}

// create product review
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment, userId, title } = req.body

  const product = await Product.findById(req.params.id)

  const user = await User.findById(userId)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (rev) => rev.user.toString() === user._id.toString(),
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed.')
    }

    const review = {
      name: user.name,
      rating: Number(rating),
      comment,
      title,
      user: user._id,
    }

    product.reviews.push(review)

    product.numberOrReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length
    await product.save()
    res.status(201).json({ message: 'Review has been saved.' })
  } else {
    throw new Error('Product not found')
  }
})

//* create product
const createNewProduct = asyncHandler(async(req,res) => {
  const { brand, name, category, stock, price, image, productIsNew, description } = req.body

  const newProduct = await Product.create({
    brand,
    name,
    category,
    stock,
    price,
    image: '/images/' + image,
    productIsNew,
    description,
  })
  await newProduct.save()

  const products = await Product.find({})

  if (newProduct) {
    res.json(products)
  } else {
    res.status(404)
    throw new Error('Product could not be uploaded.')
  }
})
//* delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
//* update product
const updateProduct = asyncHandler(async (req, res) => {
  const { brand, name, image, category, stock, price, id, productIsNew, description } = req.body

  const product = await Product.findById(id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.brand = brand
    product.image = '/images/' + image
    product.category = category
    product.stock = stock
    product.productIsNew = productIsNew

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404);
    throw new Error('Product not found.')
  }
})
//! ====== routes =============
productRoutes.get('/', getProducts)
productRoutes.get('/:id', getProduct)
productRoutes.post('/reviews/:id', protectRoute, createProductReview)
productRoutes.post("/",protectRoute, admin, createNewProduct)
productRoutes.put("/",protectRoute, admin, updateProduct)
productRoutes.delete("/:Id",protectRoute, admin, deleteProduct)


export default productRoutes
