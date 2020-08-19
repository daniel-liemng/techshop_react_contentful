import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { ProductContext } from "../context/context";

const SideCart = () => {
  const { isSidecartOpen, cart, closeCart } = useContext(ProductContext);

  return (
    <SidecartWrapper show={isSidecartOpen} onClick={closeCart}>
      <p>Sidecart</p>
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

  @media screen and (min-width: 576px) {
    width: 20rem;
  }
`;

export default SideCart;
