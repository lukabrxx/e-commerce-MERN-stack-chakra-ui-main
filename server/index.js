import dotenv from "dotenv"
import connectToDatabase from "./database.js"
import express from "express"


import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

const app = express()

dotenv.config()
connectToDatabase()

app.use(express.json())

const port = process.env.PORT || 5000

//! ROUTES 
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)


app.listen(port, () => {
    console.log(`Server runs on the port ${port}`)
})

