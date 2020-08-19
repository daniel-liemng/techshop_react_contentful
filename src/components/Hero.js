import React from "react";
import styled from "styled-components";
import mainBcg from "../images/mainBcg.jpeg";

const Hero = ({ title, image, max, children }) => {
  return (
    <HeroWrapper max={max} img={image}>
      <div className='banner'>
        <h1 className='title'>{title}</h1>
        {children}
      </div>
    </HeroWrapper>
  );
};

const HeroWrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${(props) => (props.max ? "100vh" : "60vh")};
  color: var(--mainWhite);
  background: linear-gradient(var(--primaryRGBA), var(--primaryRGBA)),
    url(${(props) => props.img}) center/cover no-repeat;

  .title {
    padding-top: 2rem;
    font-size: 3.5rem;
    text-shadow: 4px 4px 2px var(--primaryRGBA);
    letter-spacing: var(--mainSpacing);
    text-transform: uppercase;
  }
`;

Hero.defaultProps = {
  image: mainBcg,
};

export default Hero;
