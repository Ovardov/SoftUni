import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductList from './product-list/ProductList';
import ProductPage from './product-page/ProductPage';
import ErrorPage from './error-page/ErrorPage';
import CheckoutPage from './checkout/CheckoutPage';
import ContextWrapper from './ContextWrapper';

function Navigation() {
    return (
        <ContextWrapper>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={ProductList} />
                    <Route path="/product/:id" component={ProductPage} />
                    <Route path='/checkout' component={CheckoutPage} />
                    <Route path="*" component={ErrorPage} />
                </Switch>
            </BrowserRouter>
        </ContextWrapper>
    )
}

export default Navigation;