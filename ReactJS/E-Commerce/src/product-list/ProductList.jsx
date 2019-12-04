import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../product-card/ProductCard';
import Header from '../header/Header';
import styles from './product-list.module.css';
import data from '../data';

function renderCards(products) {
  return products.map(product => {
    return (
      <Fragment key={product.id}>
        <ProductCard {...product} />
      </Fragment>
    )
  })
}

function ProductList() {
  const [isRed, setColor] = useState(false);

  const handleClick = () => {
    setColor(!isRed);
  }

  const themeClass = isRed ? styles.redContainer : styles.container

  return (
    <Fragment>
      <Header />
      <div className="container">
        <button onClick={handleClick}>Toggle Red Theme</button>
        <div className={themeClass}>
          {renderCards(data)}
        </div>
      </div>
    </Fragment >
  )

}

ProductList.defaultProps = {
  products: []
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired
}

export default ProductList;
