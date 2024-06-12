"use client";
import { useState } from "react";
import CartContext from "./CartContext.js";

const CartState = (props) => {
  const [count, setCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  return (
    <CartContext.Provider value={{ count, setCount, cartItems, setCartItems }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
