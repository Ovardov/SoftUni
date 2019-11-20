import React, { Component, Fragment } from 'react';
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

class ProductList extends Component {
  state = {
    isRed: false,
  }

  handleClick = () => {
    this.setState({
      isRed: !this.state.isRed
    });
  }

  render() {
    const themeClass = this.state.isRed ? styles.redContainer : styles.container

    return (
      <Fragment>
        <Header />
        <div className="container">
          <button onClick={this.handleClick}>Toggle Red Theme</button>
          <div className={themeClass}>
            {renderCards(data)}
          </div>
        </div>
      </Fragment >
    )
  }
}

ProductList.defaultProps = {
  products: []
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired
}

export default ProductList;
