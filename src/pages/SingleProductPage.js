import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import singleProductBcg from "../images/singleProductBcg.jpeg";

import { ProductContext } from "../context/context";

const SingleProductPage = () => {
  const { singleProducts, addToCart, loading } = useContext(ProductContext);

  if (loading) return <h1>Loading...</h1>;

  // destructuring
  const {
    id,
    title,
    company,
    description,
    price,
    image,
    freeShipping,
  } = singleProducts;

  return (
    <>
      <Hero image={singleProductBcg} title={title || "single product"} />
      <section className='py-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-10 mx-auto col-sm-8 col-md-6 my-3'>
              <img
                src={`../${image}`}
                alt='single product'
                className='img-fluid'
              />
            </div>
            <div className='col-10 mx-auto col-sm-8 col-md-6 my-3'>
              <h4 className='text-title mb-4'>{title}</h4>
              <h5 className='text-muted text-capitalize mb-4'>
                company: {company}
              </h5>
              <h5 className='text-main text-capitalize mb-4'>
                price: ${price}
              </h5>
              <p className='text-title text-capitalize mb-4'>
                some info about the product
              </p>
              <p>{description}</p>
              <button
                type='button'
                className='main-link'
                onClick={() => addToCart(id)}
                style={{ margin: "0.75rem" }}
              >
                Add to cart
              </button>
              <Link
                to='/products'
                className='main-link'
                style={{ margin: "0.75rem" }}
              >
                products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProductPage;
