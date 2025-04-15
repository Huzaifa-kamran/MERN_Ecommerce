const mongoose = require('mongoose');

const cartShema = mongoose.Schema({
    items: [{
        item: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Products', required: true },
        quantity: { type: Number, required: true }
    }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
});
const cart = mongoose.model('Cart', cartShema);
module.exports = cart;