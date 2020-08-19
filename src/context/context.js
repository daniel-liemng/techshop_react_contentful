import React, { createContext, useState } from "react";
import { linkData } from "./linkData";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  // state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidecartOpen, setIsSidecartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(12);
  const [links, setLinks] = useState(linkData);
  const [cart, setCart] = useState([]);

  // func
  // toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // toggle sidecart
  const toggleSidecart = () => {
    setIsSidecartOpen(!isSidecartOpen);
  };

  // open cart
  const openCart = () => {
    setIsSidecartOpen(true);
  };

  // close cart
  const closeCart = () => {
    setIsSidecartOpen(false);
  };

  return (
    <ProductContext.Provider
      value={{
        isSidebarOpen,
        isSidecartOpen,
        cartItems,
        links,
        toggleSidebar,
        toggleSidecart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
