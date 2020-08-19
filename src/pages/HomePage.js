import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { ProductContext } from "../context/context";
import Hero from "../components/Hero";
import Services from "../components/HomePage/Services";
import Featured from "../components/HomePage/Featured";

const HomePage = () => {
  const data = useContext(ProductContext);

  return (
    <>
      <Hero max='true' title='awesome gadgets'>
        <Link to='/products' className='main-link' style={{ margin: "2rem" }}>
          our products
        </Link>
      </Hero>
      <Services />
      <Featured />
    </>
  );
};

export default HomePage;
