import React, { useContext } from "react";
import { ProductContext } from "../../context/context";
import {
  FaTrash,
  FaChevronCircleUp,
  FaChevronCircleDown,
} from "react-icons/fa";

const CartItem = ({ item }) => {
  const { increment, decrement, removeItem } = useContext(ProductContext);
  const { id, title, price, image, count, total } = item;

  return (
    <div className='row mt-5 mt-lg-0 text-capitalize text-center align-items-center'>
      <div className='col-10 mx-auto col-lg-2 pb-2'>
        <img
          src={`../${image}`}
          alt='product'
          width='100'
          className='img-fluid'
        />
      </div>
      <div className='col-10 mx-auto col-lg-2 pb-2'>
        <span className='d-lg-none'>product: </span>
        {title}
      </div>
      <div className='col-10 mx-auto col-lg-2 pb-2'>
        <span className='d-lg-none'>price: </span>${price}
      </div>
      <div className='col-10 mx-auto col-lg-2 my-2 my-lg-0'>
        <div className='d-flex justify-content-center'>
          <div>
            <FaChevronCircleDown
              className='text-primary cart-icon'
              onClick={() => {
                decrement(id);
              }}
            />
          </div>
          <span className='text-title text-muted mx-3'>{count}</span>
          <div>
            <FaChevronCircleUp
              className='text-primary cart-icon'
              onClick={() => {
                increment(id);
              }}
            />
          </div>
        </div>
      </div>
      <div className='col-10 mx-auto col-lg-2'>
        <FaTrash
          className='text-danger cart-icon'
          onClick={() => removeItem(id)}
        />
      </div>
      <div className='col-10 mx-auto col-lg-2'>
        <strong className='text-muted'>item total: ${total}</strong>
      </div>
    </div>
  );
};

export default CartItem;
