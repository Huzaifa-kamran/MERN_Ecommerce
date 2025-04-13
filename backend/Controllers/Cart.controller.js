const Cart = require('../models/Cart.model'); // Capital C
const product = require('../Models/Products.model');
const User = require('../Models/Users.model'); // Ensure this path is correct

// @Method   POST
// @API      http://localhost:5000/cart/addToCart
const addToCart = async (req, res) => {
    try {
        const { item, quantity,userId } = req.body;
        const checkCart = await Cart.findOne({ userId: userId });
        if (!checkCart) {
            const newCart = await Cart.create({ items: [{ item, quantity }], userId: userId });
            return res.status(201).json({ message: 'Product added to cart successfully.', cart: newCart });
        }
        const checkItem = checkCart.items.find((i) => i.item.toString() === item);
        if (checkItem) {
            checkItem.quantity += quantity;
            await checkCart.save();
            return res.status(200).json({ message: 'Product quantity updated successfully.', cart: checkCart });
        }
        checkCart.items.push({ item, quantity });
        await checkCart.save();
        res.status(201).json({ message: 'Product added to cart successfully.', cart: checkCart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add product to cart.', error: error.message });
    }
};

// @Method   GET
// @API      http://localhost:5000/cart/getCart/:userId
const getCart = async (req, res) => {
    console.log("request hit");
    try {
        const userId = req.params.userId;
        console.log("userId"+userId);
        const checkCart = await Cart.findOne({userId: userId}).populate('items.item');
        console.log("checkCart"+checkCart);
        if (!checkCart) {
            return res.status(404).json({ message: 'Cart is empty.' });
        }
        res.status(200).json(checkCart);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch cart.', error: error.message });
    }
};

// @Method   PUT
// @API      http://localhost:5000/cart/updateCart
const updateCart = async (req, res) => {
    try {
        const { userId, items } = req.body;
        const checkCart = await Cart.findOne({ userId: userId });
        if (!checkCart) {
            return res.status(404).json({ message: 'Cart is empty.' });
        }
        checkCart.items = items;
        await checkCart.save();
        res.status(200).json({ message: 'Cart updated successfully.', cart: checkCart });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update cart.', error: error.message });
    }
};

// @Method   DELETE
// @API      http://localhost:5000/cart/removeFromCart
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        const checkCart = await Cart.findOne({ userId: userId });
        if (!checkCart) {
            return res.status(404).json({ message: 'Cart is empty.' });
        }
        checkCart.items = checkCart.items.filter((item) => item.item.toString()!== itemId);
        await checkCart.save();
        res.status(200).json({ message: 'Product removed from cart successfully.', cart: checkCart });
        } catch (error) {
        res.status(500).json({ message: 'Failed to remove product from cart.', error: error.message });
    }
}

module.exports = { addToCart, getCart, updateCart, removeFromCart };
