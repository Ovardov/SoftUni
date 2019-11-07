import React from 'react';
import ReactDOM from 'react-dom';
import ProductList from './product-list/ProductList';
import data from './data';
import './index.css';

ReactDOM.render(<ProductList products={data} />, document.getElementById('root'));