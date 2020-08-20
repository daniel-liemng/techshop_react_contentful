import React, { useContext } from "react";
import Product from "../Product";
import { Link } from "react-router-dom";
import Title from "../Title";

import { ProductContext } from "../../context/context";

const Featured = () => {
  const { featuredProducts } = useContext(ProductContext);

  return (
    <section className='py-5'>
      <div className='container'>
        <Title title='featured products' center='true' />
        <div className='row my-5'>
          {featuredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <div className='row mt-5'>
          <div className='col text-center'>
            <Link to='/products' className='main-link'>
              our products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
