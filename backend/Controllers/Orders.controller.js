const orders = require('../Models/Orders.model');

// @Method   POST
// @API      http://localhost:5000/orders/addOrder
const addOrder = async (req, res) => {
    try {
        const { user, items, totalAmount, paymentStatus, orderStatus, shippingAddress } = req.body;
        const newOrder = await orders.create({ user, 
            items, totalAmount, paymentStatus, orderStatus, shippingAddress });
       return res.status(201).json({ message: 'Order added successfully.', order: newOrder });
    } catch (error) {
       return res.status(500).json({ message: 'Failed to add order.', error: error.message });
    }
};

// @Method   GET
// @API      http://localhost:5000/orders/getAllOrders
const getOrders = async (req, res) => {
    try {
        const allOrders = await orders.find();
       return res.status(200).json({ orders: allOrders });
    } catch (error) {
       return res.status(500).json({ message: 'Failed to get orders.', error: error.message });
    }
};

// @Method   GET
// @API      http://localhost:5000/orders/getOrderById/:id
const getOrderById = async (req, res) => {
    try {
        const order = await orders.findById(req.params.id);
        return res.status(200).json({ order });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get order.', error: error.message });
    }
};

// @Method   GET
// @API      http://localhost:5000/orders/getOrdersByUserId/:userId
const getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const order = await orders.find({ user: userId });
        if(! order){
            return res.status(404).json({ message: 'No orders found for this user.' });
        }
        return res.status(200).json({ order });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get order.', error: error.message });
    }
};

// @Method   PUT
// @API      http://localhost:5000/orders/updateOrder/:orderId
const updateOrder = async (req, res) => {
try {
    const {orderId} = req.params;
    const { user, items, totalAmount, paymentStatus, orderStatus, shippingAddress } = req.body;
    const order = await findOrderById(orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
    }

    const updatedOrder = await orders.findByIdAndUpdate(orderId, { user, items, totalAmount, paymentStatus, orderStatus, shippingAddress }, { new: true });
    return res.status(200).json({ message: 'Order updated successfully.', order: updatedOrder });
    
} catch (error) {
    return res.status(500).json({ message: 'Failed to update order.', error: error.message });
}
}

// @Method   DELETE
// @API      http://localhost:5000/orders/deleteOrder/:id
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orders.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        return res.status(200).json({ message: 'Order deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete order.', error: error.message });
    }
};

module.exports = {addOrder, getOrders, getOrderById, getOrdersByUserId, updateOrder, deleteOrder} 