import React, { useContext } from "react";
import { ProductContext } from "../../context/context";
import styled from "styled-components";

const ProductFilter = () => {
  const {
    filters: { search, min, max, company, price, shipping },
    handleChange,
    storeProducts,
  } = useContext(ProductContext);

  // functionality
  // let companies = new Set(storeProducts.map(({ company }) => company));
  // companies = ["all", ...companies];
  // console.log(companies);

  // list all unique companies
  let companies = new Set();
  companies.add("all");
  for (let product in storeProducts) {
    companies.add(storeProducts[product]["company"]);
  }
  companies = [...companies];

  return (
    <div className='row my-5'>
      <div className='col-10 mx-auto'>
        <FilterWrapper>
          {/* Name Search */}
          <div>
            <label htmlFor='search'>Search Products</label>
            <input
              type='text'
              name='search'
              id='search'
              value={search}
              onChange={handleChange}
              className='filter-item'
            />
          </div>
          {/* Category Search */}
          <div>
            <label htmlFor='company'>Company</label>
            <select
              name='company'
              id='company'
              className='filter-item'
              value={company}
              onChange={handleChange}
              className='filter-item'
            >
              {companies.map((company, i) => (
                <option
                  key={i}
                  value={company}
                  style={{ textTransform: "capitalize" }}
                >
                  {company}
                </option>
              ))}
            </select>
          </div>
          {/* Price Search */}
          <div>
            <label htmlFor='price'>
              <p className='mb-2'>
                Product Price: <span>$ {price}</span>
              </p>
            </label>
            <input
              type='range'
              name='price'
              id='price'
              min={min}
              max={max}
              value={price}
              onChange={handleChange}
              className='filter-price'
            />
          </div>
          {/* Shipping */}
          <div>
            <label htmlFor='shipping' className='mr-2'>
              Free Shipping
            </label>
            <input
              type='checkbox'
              name='shipping'
              id='shipping'
              checked={shipping && true}
              onChange={handleChange}
            />
          </div>
        </FilterWrapper>
      </div>
    </div>
  );
};

const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;

  label {
    font-weight: bold;
    text-transform: capitalize;
  }

  .filter-item,
  .filter-price {
    display: block;
    width: 100%;
    background: transparent;
    border-radius: 0.5rem;
    border: 2px solid var(--darkGrey);
  }
`;

export default ProductFilter;
