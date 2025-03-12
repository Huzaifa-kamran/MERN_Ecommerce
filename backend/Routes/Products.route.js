const express = require('express');
const router = express.Router();
const {ImageLayer} = require('../Middlewares/ImageUpload');
const { addProduct, getProducts, getProduct, updateProduct, deleteProduct } = require("../Controllers/Products.controller");

const upload = ImageLayer();

// Add Product Route 
router.post('/addProduct', upload.single("proImage"), addProduct);

// GET All Products Route
 router.get('/getProducts', getProducts);

// GET Product by ID Route
router.get('/getProduct/:id', getProduct);

// Update Product Route
router.put('/updateProduct', upload.single("proImage"),updateProduct);

// Delete Product Route
router.delete('/deleteProduct/:id', deleteProduct);

module.exports = router;