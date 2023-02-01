import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import   {admin, protectRoute}  from '../middleware/authMiddleware.js';

const orderRoutes = express.Router();

//* NEW ORDER
const createOrder = asyncHandler(async(req,res) => {
    const { orderItems, shippingAddress, paymentMethod, shippingPrice, totalPrice, paymentDetails, userInfo } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items.');
      } else {
        const order = new Order({
          orderItems,
          user: userInfo._id,
          username: userInfo.name,
          email: userInfo.email,
          shippingAddress,
          paymentMethod,
          paymentDetails,
          shippingPrice,
          totalPrice,
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
      }
})
// * GET ORDER
const getOrders = async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
};
//* DELETE ORDER
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found.');
  }
});
//* SET DELIVERED
const setDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order could not be updated.');
  }
});

//! ======ROUTES=====
//? post create something new
//? put upddate 
//? fetch data 
//? delete remove data 
orderRoutes.post("/", protectRoute, createOrder)
orderRoutes.delete("/:id", protectRoute, admin, deleteOrder)
orderRoutes.put("/:id", protectRoute, admin, setDelivered)
orderRoutes.get("/", protectRoute, admin, getOrders)

export default orderRoutes