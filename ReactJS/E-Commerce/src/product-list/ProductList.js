import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../product-card/ProductCard'
import Header from '../header/Header'
import './product-list.css';

function ProductList({ products }) {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <ProductCard {...products[0]} />
      </div>
    </Fragment>
  )
}

ProductList.defaultProps = {
  products: []
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired
}

export default ProductList;
