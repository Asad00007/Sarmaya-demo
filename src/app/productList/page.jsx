"use client";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useContext } from "react";
import CartContext from "@/context/cart/CartContext";
import Link from "next/link";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [temp, setTemp] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { count, setCount, cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSearch(temp);
        setLoading(true);
        const response = await axios.get(
          `https://dummyjson.com/products/search?q=${temp}`
        );
        setProducts(response.data.products);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Error fetching the products:", err);
      }
    };
    fetchData();
  }, [temp]);

  const searchItem = async () => {
    setSearch(temp);
    try {
      setLoading(true);
      const filteredData = await axios.get(
        `https://dummyjson.com/products/search?q=${temp}`
      );
      setProducts(filteredData.data.products);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching the products:", err);
    }
  };

  const toggleCart = (title) => {
    if (cartItems.length > 0) {
      const found = cartItems.find((item) => item === title);
      if (found) {
        setCartItems(cartItems.filter((item) => item !== title));
        setCount(count - 1);
      } else {
        setCartItems([...cartItems, title]);
        setCount(count + 1);
      }
      return;
    } else {
      setCartItems([...cartItems, title]);
      setCount(count + 1);
      return;
    }
  };
  return (
    <div className=" my-[110px] w-[95%] max-w-full mx-auto px-2 md:px-5 h-full ">
      <h1 className="text-2xl md:text-3xl pt-10 font-semibold">
        Product list
        <span className="text-[14px] ml-2">
          (Click on any product name to see it&apos;s details)
        </span>
      </h1>
      <div className="flex flex-col gap-5 my-10">
        <label htmlFor="product">Search your favourite product here:</label>
        <div className="w-full flex items-center bg-white rounded-md border   ">
          <div>
            <FaSearch className="mx-1 md:mx-4" />
          </div>
          <input
            type="text"
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            placeholder="Search here...(e.g. phone)"
            className="flex-1 bg-transparent outline-none px-2 md:px-3 py-3"
          />
          {temp && (
            <div
              className="px-3 text-2xl cursor-pointer"
              onClick={() => setTemp("")}
            >
              &times;
            </div>
          )}
          <button
            className="hidden md:block border-l p-3 px-10 bg-gray-100"
            onClick={searchItem}
          >
            Search
          </button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center">
            <RotatingLines color="#000000" loading={loading} width="30" />
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-semibold my-5">
              {/* Here are all the products in the list: */}
              {search !== ""
                ? `Showing Results including "${search}"`
                : products.length > 0
                ? "Here are some Products to start from:"
                : "Oops! Could not fetch the products. Try again later!"}
            </h1>

            {products.length > 0
              ? products.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center my-4"
                    >
                      <Link href={`/productList/${item.title}`}>
                        <div className="w-[170px] md:w-auto">{item.title}</div>
                      </Link>
                      <button
                        className="p-2 border my-1 rounded-md w-[180px]"
                        onClick={() => toggleCart(item.title)}
                      >
                        {cartItems.includes(item.title)
                          ? "Remove from Cart"
                          : "Add to Cart"}
                      </button>
                    </div>
                  );
                })
              : temp.length > 0
              ? `Sorry, no products related to ${search}`
              : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
