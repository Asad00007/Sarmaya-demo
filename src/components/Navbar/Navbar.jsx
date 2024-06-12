"use client";
import Link from "next/link";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useContext } from "react";
import CartContext from "@/context/cart/CartContext";

const CartBar = ({ showCart, setShowCart, cartItems }) => {
  return (
    <div
      className={`w-[300px] h-screen bg-black text-white fixed top-0 transition duration-300 ease-in-out right-0 ${
        showCart ? "translate-x-0" : "translate-x-full"
      } px-5 py-10 z-50`}
    >
      <div
        className="text-2xl absolute top-5 right-5 cursor-pointer"
        onClick={() => setShowCart(false)}
      >
        &times;
      </div>
      <h1 className="text-xl md:text-3xl mb-7">Your Cart:</h1>
      <div className="flex flex-col gap-5 opacity-80">
        {cartItems.length > 0
          ? cartItems.map((item, index) => {
              return <div key={index}>{item}</div>;
            })
          : "Seems like your cart is empty! Add something to see the Products"}
      </div>
    </div>
  );
};
const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const { count, cartItems } = useContext(CartContext);
  return (
    <div className="h-[100px] bg-black w-full fixed top-0 left-0">
      <CartBar
        showCart={showCart}
        setShowCart={setShowCart}
        cartItems={cartItems}
      />
      <div className="w-[95%] max-w-full mx-auto px-3 flex justify-between items-center text-white h-full">
        <Link href="/" className="text-xl md:text-3xl">
          SARMAYA.
        </Link>
        <div className="flex gap-5 md:gap-10 items-center">
          <Link href="/productList">Product List</Link>

          <span
            className="relative cursor-pointer"
            onClick={() => setShowCart(true)}
          >
            <FaCartPlus className="text-xl" />
            <span className="absolute -top-5 -right-5 bg-white  px-[8px] rounded-full text-black text-[14px]">
              {count < 1 ? "" : count}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
