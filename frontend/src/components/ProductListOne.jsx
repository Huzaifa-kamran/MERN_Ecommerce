import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {jwtDecode} from "jwt-decode";

const ProductListOne = () => {
    const [products, setProducts] = useState([]);
    const [isInCart, setIsInCart] = useState(false);

    const getDecodedToken = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        try {
          return jwtDecode(token);
        } catch (error) {
          console.error("Invalid token:", error);
          return null;
        }
      };
   useEffect(() => {
        const fetchData = async () => {
            const productList = await axios.get('http://localhost:5000/products/getProducts')
            setProducts(productList.data)
        };
        fetchData();

        const cartItems = async ()=>{
            const userId = getDecodedToken();
            console.log(userId.id);
            if (!userId) return null;
            return await axios.get(`http://localhost:5000/cart/getCart/${userId.id}`)
            .then(response=>{
                setIsInCart(response.data.some(item=>item.itemId===item))
                console.log("cart"+response.data.some(item=>item.itemId===item))
            })
            .catch(error=>console.error(error))   
        }
        cartItems();
    }, []);


      
    const handleAddToCart = async (productId) => {
        try {
            // Assuming you have a userId in your application
            const userId = getDecodedToken();
            console.log(
                "Adding product to cart for user: ", userId.id, " with product id: ", productId, "..."
            )
            if (!userId) {
                alert('Please login to add products to cart!')
                return
            }
            // Send a request to add the product to the cart
            // You might need to send the userId as well
            await axios.post('http://localhost:5000/cart/addToCart', 
                {item:productId, quantity: 1, userId: userId.id},
            )
            alert('Product added to cart!')
        } catch (error) {
            console.error(error.message)
            alert('Failed to add product to cart!'+error.message)
        }
        // console.log("Add to cart"+ productId);
    }


    return (
        <div className="product mt-24">
            <div className="container container-lg">
                <div className="row gy-4 g-12">
                    {/* Products Card Code  */}
                    {products.map((product) => {
                       return <div key={product._id} className="col-xxl-2 col-lg-3 col-sm-4 col-6">
                       <div className="product-card px-8 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                           <button
                               to="/cart"
                               onClick={() => handleAddToCart(product._id)}
                               className="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 position-absolute inset-block-start-0 inset-inline-end-0 me-16 mt-16"
                           >
                               Add <i className="ph ph-shopping-cart" />
                           </button>
                           <Link
                               to={`/product-details/${product._id}`}
                               className="product-card__thumb flex-center"
                           >
                               <img src={product.proImage} alt={product.proName} />
                           </Link>
                           <div className="product-card__content mt-12">
                               <div className="product-card__price mb-16">
                                   <span className="text-heading text-md fw-semibold ">
                                      Price: {product.proPrice}${" "}
                                   </span>
                               </div>
                               <div className="flex-align gap-6">
                                   <span className="text-xs fw-bold text-gray-600">4.8</span>
                                   <span className="text-15 fw-bold text-warning-600 d-flex">
                                       <i className="ph-fill ph-star" />
                                   </span>
                                   <span className="text-xs fw-bold text-gray-600">(17k)</span>
                               </div>
                               <h6 className="title text-lg fw-semibold mt-12 mb-8">
                                   <Link to="/product-details" className="link text-line-2">
                                       {product.proName}
                                   </Link>
                               </h6>
                               <div className="flex-align gap-4">
                                   <span className="text-main-600 text-md d-flex">
                                       <i className="ph-fill ph-storefront" />
                                   </span>
                                   <span className="text-gray-500 text-xs">
                                       By {product.proCategory.catName}
                                   </span>
                               </div>
                               <div className="mt-12">
                                   <div
                                       className="progress w-100  bg-color-three rounded-pill h-4"
                                       role="progressbar"
                                       aria-label="Basic example"
                                       aria-valuenow={35}
                                       aria-valuemin={0}
                                       aria-valuemax={100}
                                   >
                                       <div
                                           className="progress-bar bg-main-600 rounded-pill"
                                           style={{ width: "35%" }}
                                       />
                                   </div>
                                   <span className="text-gray-900 text-xs fw-medium mt-8">
                                       Sold: 18/{product.proQuantity}
                                   </span>
                               </div>
                           </div>
                       </div>
                   </div>
                    })}

                    

                    
                </div>
            </div>
        </div>

    )
}

export default ProductListOne