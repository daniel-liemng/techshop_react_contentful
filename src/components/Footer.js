import React, { useContext } from "react";
import styled from "styled-components";
import { ProductContext } from "../context/context";

const Footer = () => {
  const { socialLinks } = useContext(ProductContext);

  return (
    <FooterWrapper>
      <div className='container py-3'>
        <div className='row'>
          <div className='col-md-6'>
            <p className='text-capitalize'>
              copyright &copy; tech shop {new Date().getFullYear()}
            </p>
          </div>
          <div className='col-md-6 d-flex justify-content-around'>
            {socialLinks.map((item) => {
              return (
                <a href={item.url} key={item.id}>
                  {item.icon}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background: var(--darkGrey);
  color: var(--mainWhite);

  .icon {
    font-size: 1.5rem;
    color: var(--mainWhite);
    transition: var(--mainTransition);
  }

  .icon:hover {
    color: var(--primaryColor);
  }
`;

export default Footer;
