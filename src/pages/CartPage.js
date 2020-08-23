import React from "react";
import Hero from "../components/Hero";
import storeBcg from "../images/storeBcg.jpeg";
import CartSection from "../components/CartPage";

const CartPage = () => {
  return (
    <>
      <Hero image={storeBcg} />
      <CartSection />
    </>
  );
};

export default CartPage;
