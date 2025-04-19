// src/helpers/cartHelpers.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";


// Get decoded user from token
export const getDecodedToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};

// Reusable add to cart function
export const handleAddToCart = async (productId, isInCart, setIsInCart, toast) => {
    if (isInCart.includes(productId)) {
        toast.error("Product already in cart");
        return;
    }

    const userId = getDecodedToken();
    if (!userId) {
        alert("Please login to add products to cart!");
        return;
    }

    try {
        const response = await axios.post("http://localhost:5000/cart/addToCart", {
            item: productId,
            quantity: 1,
            userId: userId.id
        });

        toast.success(response.data.message);
        setIsInCart((prev) => [...prev, productId]);

    } catch (error) {
        toast.error(error.message);
    }
};
