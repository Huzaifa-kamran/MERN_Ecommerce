const express = require('express');
const router = express.Router();
const { addToCart, getCart, updateCart, removeFromCart } = require('../Controllers/Cart.controller');

// @Method   POST
// @API      http://localhost:5000/cart/addToCart
router.post('/addToCart', addToCart);
// @Method   GET
// @API      http://localhost:5000/cart/getCart/:userId
router.get('/getCart/:userId', getCart);
// @Method   PUT
// @API      http://localhost:5000/cart/updateCart
router.put('/updateCart', updateCart);
// @Method   DELETE
// @API      http://localhost:5000/cart/removeFromCart
router.delete('/removeFromCart', removeFromCart);
module.exports = router;