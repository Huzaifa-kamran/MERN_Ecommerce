// src/helpers/cartHelpers.js
import axios from "axios";

// Reusable add to cart function
export const handleAddToCart = async (productId, isInCart, setIsInCart, toast, user) => {

    if (isInCart.includes(productId)) {
        toast.error("Product already in cart");
        return;
    }

    if (!user?._id) {
        alert("Please login to add products to cart!");
        return;
    }

    try {
        const response = await axios.post("http://localhost:5000/cart/addToCart", {
            item: productId,
            quantity: 1,
            userId: user._id
        });

        toast.success(response.data.message);
        setIsInCart((prev) => [...prev, productId]);

    } catch (error) {
        toast.error(error.message);
    }
};
