import React from "react";
import Hero from "../components/Hero";
import defaultBcg from "../images/defaultBcg.jpeg";
import { Link } from "react-router-dom";

const Default = () => {
  return (
    <>
      <Hero image={defaultBcg} title='404' max='true'>
        <h2 className='text-uppercase'>Page Not Found</h2>
        <Link to='/' className='main-link' style={{ margin: "2rem" }}>
          back home
        </Link>
      </Hero>
    </>
  );
};

export default Default;
