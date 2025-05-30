const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const { connectionDB } = require('./Config/ConnectionDB');

// Routes
const authRoutes = require('./Routes/Auth.route');
const categoryRoutes = require('./Routes/Category.route');
const productRoutes = require('./Routes/Products.route');
const orderRoutes = require('./Routes/Orders.route');
const cartRoutes = require('./Routes/Cart.route');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Enable Cors
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

// Use the auth routes
app.use('/auth', authRoutes);
// Use the category routes
app.use('/categories', categoryRoutes);
// Use the product routes
app.use('/products', productRoutes);
// Use the order routes
app.use('/orders', orderRoutes);
// Use the cart routes
app.use('/cart', cartRoutes);

// Start the server on the specified port
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on ${process.env.PORT}`);
    connectionDB();
});