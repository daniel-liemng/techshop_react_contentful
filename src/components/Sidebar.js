import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { ProductContext } from "../context/context";

const Sidebar = () => {
  const { links, isSidebarOpen, toggleSidebar } = useContext(ProductContext);
  return (
    <SideWrapper show={isSidebarOpen}>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <Link
              to={link.path}
              onClick={toggleSidebar}
              className='sidebar-link'
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </SideWrapper>
  );
};

const SideWrapper = styled.nav`
  position: fixed;
  top: 61px;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--mainGrey);
  border-right: 3px solid var(--primaryColor);
  transition: var(--mainTransition);
  transform: ${(prop) => (prop.show ? "translateX(0)" : "translateX(-100%)")};
  z-index: 1;

  ul {
    list-style: none;
    padding: 0 !important;
  }

  .sidebar-link {
    display: block;
    font-size: 1.5rem;
    text-transform: capitalize;
    color: var(--mainBlack);
    padding: 0.5rem 1.5rem;
    background: transparent;
    transition: var(--mainTransition);
    text-decoration: none;
  }

  .sidebar-link:hover {
    background: var(--primaryColor);
    color: var(--mainWhite);
    padding: 0.5rem 1.5rem 0.5rem 2.5rem;
  }

  @media screen and (min-width: 576px) {
    width: 20rem;
  }
`;

export default Sidebar;
