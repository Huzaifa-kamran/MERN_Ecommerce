const express = require('express');
const router = express.Router();
const { addCategory, getCategories, getCategoryById, updateCategory, deleteCategory }=
    require('../Controllers/Category.controller');


//  Add category route 
router.post('/addCategory', addCategory);

// Get all categories route
router.get('/getCategories', getCategories);

// Get category by id route
router.get('/getCategory/:id', getCategoryById);

// Update category route
router.put('/updateCategory/:id', updateCategory);

// Delete category route
router.delete('/deleteCategory/:id', deleteCategory);

module.exports = router;
