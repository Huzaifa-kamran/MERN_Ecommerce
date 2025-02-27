const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const { connectionDB } = require('./Config/ConnectionDB');

// Routes
const authRoutes = require('./Routes/Auth.route');
const productRoutes = require('./Routes/Products.route');
const orderRoutes = require('./Routes/Order.route');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Use the auth routes
app.use('/auth', authRoutes);
// Use the product routes
app.use('/products', productRoutes);
// Use the order routes
 app.use('/orders', orderRoutes);


// Start the server on the specified port
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on ${process.env.PORT}`);
    connectionDB();
});