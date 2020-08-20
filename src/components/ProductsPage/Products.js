import React, { useContext } from "react";
import { ProductContext } from "../../context/context";
import Title from "../Title";
import Product from "../Product";

const Products = () => {
  const { filteredProducts } = useContext(ProductContext);

  return (
    <section className='py-5'>
      <div className='container'>
        <Title title='our products' center />
        <div className='row py-5'>
          {filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
