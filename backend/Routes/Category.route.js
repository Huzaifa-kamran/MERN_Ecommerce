const express = require('express');
const router = express.Router();
const {ImageLayer} = require('../Middlewares/ImageUpload');
const { addCategory, getCategories, getCategoryById, updateCategory, deleteCategory }=
    require('../Controllers/Category.controller');

    const upload = ImageLayer();
//  Add category route 
router.post('/addCategory', upload.single("catImage"),addCategory);

// Get all categories route
router.get('/getCategories', getCategories);

// Get category by id route
router.get('/getCategory/:id', getCategoryById);

// Update category route
router.put('/updateCategory/:id',upload.single("catImage"), updateCategory);

// Delete category route
router.delete('/deleteCategory/:id', deleteCategory);

module.exports = router;
