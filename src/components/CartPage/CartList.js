import React, { useContext } from "react";
import CartItem from "./CartItem";
import { ProductContext } from "../../context/context";

const CartList = () => {
  const { cart } = useContext(ProductContext);

  if (cart.length === 0) {
    return (
      <h1 className='text-title text-center my-4'>
        your cart is currently empty
      </h1>
    );
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartList;
