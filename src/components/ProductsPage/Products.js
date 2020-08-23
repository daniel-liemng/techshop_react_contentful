import React, { useContext } from "react";
import { ProductContext } from "../../context/context";
import Title from "../Title";
import Product from "../Product";
import ProductFilter from "./ProductFilter";

const Products = () => {
  const { filteredProducts } = useContext(ProductContext);

  return (
    <section className='py-5'>
      <div className='container'>
        <Title title='our products' center />
        {/* Filter */}
        <ProductFilter />
        {/* Product Total */}
        <div className='row'>
          <div className='col-10 mx-auto'>
            <h6 className='text-title'>
              Product Total: {filteredProducts.length}
            </h6>
          </div>
        </div>
        {/* Show product */}
        <div className='row py-5'>
          {filteredProducts.length === 0 ? (
            <div className='col text-center text-title'>
              Sorry, no items matched your search
            </div>
          ) : (
            filteredProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
