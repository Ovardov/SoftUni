import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ProductList from './product-list/ProductList';
import ProductPage from './product-page/ProductPage';
import ErrorPage from './error-page/ErrorPage';

function Navigation() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ProductList} />
                <Route path="/product/:id" component={ProductPage} />
                <Route path="*" component={ErrorPage} />
            </Switch>
        </BrowserRouter>
    )
}

export default Navigation;