const express = require('express');
const router = express.Router();
const {addOrder, 
       getOrders, 
       getOrderById, 
       getOrdersByUserId, 
       updateOrder, 
       deleteOrder} = require('../Controllers/Orders.controller');

// Add Order Route
router.post('/addOrder', addOrder);

// Get All Orders Route
router.get('/getAllOrders', getOrders);

// Get Order By ID Route
router.get('/getOrderById/:id', getOrderById);

// Get Orders By User ID Route
router.get('/getOrdersByUserId/:userId', getOrdersByUserId);

// Update Order Route
router.put('/updateOrder/:id', updateOrder);

// Delete Order Route
router.delete('/deleteOrder/:id', deleteOrder);

module.exports = router;

