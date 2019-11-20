import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductPrice from '../product-price/ProductPrice';
import './product-card.css';

class ProductCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            counter: 0
        };

        this.interval = null;
    }

    handleMouseOver = () => {
        this.interval = setInterval(() => {
            this.setState({
                counter: this.state.counter + 1
            });
        }, 1000);
    }

    handleMouseOut = () => {
        clearInterval(this.interval);
    }

    render() {
        const { image, title, brand, price, id } = this.props;

        return (
            <div className="product-tile" onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseOut}>
                <Link to={`/product/${id}`}>
                    <img className="product-image" src={image} alt={title} />
                </Link>
                <div>
                    <span className="product-brand">{brand}</span>
                    <span className="product-title">{title}</span>
                    <ProductPrice price={price} />
                    <span className="product-seconds">Seconds Counter: {this.state.counter}</span>
                </div>
            </div>
        )
    }
}

ProductCard.defaultProps = {
    image: '',
    title: 'Placeholder',
    brand: '',
    price: 0
}

ProductCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

export default ProductCard;