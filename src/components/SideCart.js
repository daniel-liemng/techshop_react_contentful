import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { ProductContext } from "../context/context";

const SideCart = () => {
  const { isSidecartOpen, cart, cartTotal, closeCart } = useContext(
    ProductContext
  );

  // console.log(cart);

  return (
    <SidecartWrapper show={isSidecartOpen} onClick={closeCart}>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className='cart-item mb-4'>
            <img
              width='50'
              // src={`../${item.image}`}
              src={item.image}
              alt='cart item'
            />
            <div className='mt-3'>
              <h6 className='text-uppercase'>{item.title}</h6>
              <h6 className='text-title text-capitalize'>
                amount: {item.count}
              </h6>
            </div>
          </li>
        ))}
      </ul>

      <h4 className='text-capitalize text-main'>cart total: ${cartTotal}</h4>

      <div className='text-center my-5'>
        <Link to='/cart' className='main-link'>
          Cart Page
        </Link>
      </div>
    </SidecartWrapper>
  );
};

const SidecartWrapper = styled.div`
  position: fixed;
  top: 61px;
  right: 0;
  width: 100%;
  height: 100%;
  border-left: 3px solid var(--primaryColor);
  transition: var(--mainTransition);
  background: var(--mainGrey);
  z-index: 1;
  transform: ${(props) => (props.show ? "translateX(0)" : "translateX(100%)")};
  overflow: scroll;
  padding: 2rem;

  @media screen and (min-width: 576px) {
    width: 20rem;
  }

  ul {
    list-style: none;
    padding: 0 !important;
  }
`;

export default SideCart;
