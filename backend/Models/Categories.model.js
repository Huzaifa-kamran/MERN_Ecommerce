const mongoose = require('mongoose');

const categoriesModel = mongoose.Schema({
    catName: {
        type: String,
        required: true
    },
    catDescription: {
        type: String,
        required: true
    }
});
const Categories = mongoose.model('Categories', categoriesModel);
module.exports = Categories;