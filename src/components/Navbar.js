import React, { useContext } from "react";
import { FaBars, FaCartPlus } from "react-icons/fa";
import styled from "styled-components";
import { ProductContext } from "../context/context";
import logo from "../images/logo.svg";

const Navbar = () => {
  const { cartItems, toggleSidebar, toggleSidecart } = useContext(
    ProductContext
  );

  return (
    <NavWrapper>
      <div className='nav-center'>
        <FaBars className='nav-icon' onClick={toggleSidebar} />
        <img src={logo} alt='shop logo' />
        <div className='nav-cart' onClick={toggleSidecart}>
          <FaCartPlus className='nav-icon' />
          <div className='cart-items'>{cartItems}</div>
        </div>
      </div>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 1rem 1.5rem;
  background: var(--mainWhite);
  border-bottom: 3px solid var(--primaryColor);
  z-index: 1;

  .nav-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1170px;
    margin: 0 auto;
  }

  .nav-icon {
    font-size: 1.5rem;
    cursor: pointer;
  }

  .nav-cart {
    position: relative;
  }

  .cart-items {
    position: absolute;
    top: -12px;
    right: -12px;
    background: var(--primaryColor);
    color: var(--mainWhite);
    font-size: 0.85rem;
    padding: 2px 5px;
    border-radius: 50%;
  }
`;

export default Navbar;
