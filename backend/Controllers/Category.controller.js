const Categories = require('../Models/Categories.model')

// @Method   POST 
// @API      http://localhost:5000/addCategory
const addCategory = async (req, res) => {
    try {
        const { catName, catDescription } = req.body;

        if (!catName || !catDescription) {
            return res.status(400).json({ message: 'Please provide both category name and description.' });
        }

        const checkCategory = await Categories.findOne({ catName });
        if (checkCategory) {
            return res.status(400).json({ message: 'Category already exists.' });
        }

        const newCategory = await Categories.create({ catName, catDescription });
        res.status(201).json({ message: 'Category added successfully.', category: newCategory });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add category.', error: error.message });
    }
};

// @Method   GET
// @API      http://localhost:5000/getCategories
const getCategories = async (req, res) => {
    try {
        const categories = await Categories.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch categories.', error: error.message });
    }
};

// @Method   GET
// @API      http://localhost:5000/getCategory/:id
const getCategoryById = async (req, res) => {
    try {
        const category = await Categories.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch category.', error: error.message });
    }
};

// @Method   PUT
// @API      http://localhost:5000/updateCategory/:id
const updateCategory = async (req, res) => {
    try {
        const { catName, catDescription } = req.body;
        const updatedCategory = await Categories.findByIdAndUpdate(
            req.params.id,
            { catName, catDescription },
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found.' });
        }
        res.status(200).json({ message: 'Category updated successfully.', category: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update category.', error: error.message });
    }
};

// @Method   DELETE
// @API      http://localhost:5000/deleteCategory/:id
const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Categories.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found.' });
        }
        res.status(200).json({ message: 'Category deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete category.', error: error.message });
    }
};

module.exports = { addCategory, getCategories, getCategoryById, updateCategory, deleteCategory };
