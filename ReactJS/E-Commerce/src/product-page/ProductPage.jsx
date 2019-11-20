import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import data from '../data';

function ProductPage(props) {
    const product = data.filter((item) => {
        return item.id === props.match.params.id;
    })[0];

    return(
        <Fragment>
            <Header />
            <div>
                Product page - {product.title}
                <div>
                    <Link to="/">Go back to homepage</Link>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductPage;