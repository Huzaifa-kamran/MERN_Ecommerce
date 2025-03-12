const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    proName:{
        type: String,
        required: true,
        uniqe: true
    },
    proDescription:{
        type: String,
        required: true
    },
    proCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        required: true
    },
    proQuantity:{
        type: Number,
        required: true
    },
    purchasingPrice:{
        type: Number,
        required: true
    },
    proPrice:{
        type: Number,
        required: true
    },
    proImage:{
        type: String,
        required: true
    },
});

const products = mongoose.model('Products', productsSchema);
module.exports = products;