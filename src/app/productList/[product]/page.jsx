"use client";

import axios from "axios";
import { useContext } from "react";
import CartContext from "@/context/cart/CartContext";
import { useEffect, useState } from "react";

const ProductDetails = ({ params }) => {
  const title = decodeURI(params.product);
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const capsFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const { count, setCount, cartItems, setCartItems } = useContext(CartContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProductList(response.data.products);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching the products:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const currentProduct = productList.find((item) => item.title === title);
  const toggleProduct = (p_title) => {
    if (cartItems.length > 0) {
      const found = cartItems.find((item) => item === p_title);
      if (found) {
        setCartItems(cartItems.filter((item) => item !== p_title));
        setCount(count - 1);
      } else {
        setCartItems([...cartItems, p_title]);
        setCount(count + 1);
      }
      return;
    } else {
      setCartItems([...cartItems, p_title]);
      setCount(count + 1);
      return;
    }
  };
  return (
    <div className=" my-[110px] w-[90%] max-w-full mx-auto px-5 h-full  ">
      <h1 className="text-2xl md:text-3xl py-10 font-semibold">
        Product Details Page:
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : currentProduct ? (
        <div className="space-y-2">
          <h1 className="text-2xl py-5 font-semibold">
            {currentProduct.title}:
          </h1>

          <p>{currentProduct.description}</p>
          <h3 className="font-semibold">Category:</h3>
          <p>{capsFirstLetter(currentProduct.category)}</p>
          <h3 className="font-semibold">Price:</h3>
          <p>{currentProduct.price}</p>
          <h3 className="font-semibold">Rating:</h3>
          <p>{currentProduct.rating}</p>
          <button
            className="p-2 border my-1 rounded-md"
            onClick={() => toggleProduct(currentProduct.title)}
          >
            {cartItems.includes(currentProduct.title)
              ? "Remove from Cart"
              : 'Add to Cart"'}
          </button>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetails;
