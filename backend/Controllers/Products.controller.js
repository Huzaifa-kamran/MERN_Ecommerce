const products = require("../Models/Products.model");

// @Method   POST
// @API      http://localhost:5000/product/addProduct
const addProduct = async (req, res) => {
    try {
        const { proName, proDescription, proCategory, proPrice} = req.body;

        if (!proName || !proDescription || !proCategory || !proPrice || !proImage) {
            return res.status(400).json({ message: 'Please provide all product details.' });
        }

        const checkProduct = await products.findOne({ proName });
        if (checkProduct) {
            return res.status(400).json({ message: 'Product already exists.' });
        }
        console.log(!req.file);
        if(!req.file){
        return res.status(400).send({"error":"Product Image must be provided."});
        }
        const proImage = req.file.path;
        const newProduct = await products.create({ proName, proDescription, proCategory, proPrice, proImage });
       return res.status(201).json({ message: 'Product added successfully.', product: newProduct });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to add product.', error: error.message });
    }
};

// @Method   GET
// @API      http://localhost:5000/product/getProducts
const getProducts = async (req, res) => {
    try {
        const allProducts = await products.find();
        return res.status(200).json(allProducts);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch products.', error: error.message });
    }
};

// @Method   GET
// @API      http://localhost:5000/product/getProduct/:id
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await products.findById(id);
        return product ? res.json(product) : res.status(404).json({ error: 'Product not found' });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

// @Method   PUT
// @API      http://localhost:5000/product/updateProduct/:id
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { proName, proDescription, proCategory, proPrice } = req.body;
        const proImage = req.file ? req.file.path : null;
        const updatedProduct = await products.findByIdAndUpdate(id, { proName, proDescription, proCategory, proPrice, proImage }, { new: true });
        return updatedProduct ? res.json({ message: 'Product updated successfully', product: updatedProduct }) : res.status(404).json({ error: 'Failed to update product' });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

// @Method   DELETE
// @API      http://localhost:5000/product/deleteProduct/:id
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await products.findByIdAndDelete(id);
        return deletedProduct ? res.json({ message: 'Product deleted successfully' }) : res.status(404).json({ error: 'Failed to delete product' });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

module.exports = { addProduct, getProducts, getProduct, updateProduct, deleteProduct };
