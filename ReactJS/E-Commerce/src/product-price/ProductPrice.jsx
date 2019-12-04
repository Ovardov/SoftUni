import React, { Component } from 'react';
import { AuthContext } from '../ContextWrapper';
import PropTypes from 'prop-types';
import './product-price.css';

class ProductPrice extends Component {
    static contextType = AuthContext;

    render() {
        const { price } = this.props

        return (
                <div>
                    <p className="product-price">
                        Price:
                    <span>{price}$</span>

                        {this.context.auth ? (
                            <p>You have a 10% discount</p>

                        ) : null}
                    </p>
                </div>
        )
    }

}

ProductPrice.defaultProps = {
    price: 0
}

ProductPrice.propTypes = {
    price: PropTypes.number.isRequired
}

export default ProductPrice;