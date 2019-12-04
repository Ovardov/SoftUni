import React from 'react';
import ProductPrice from './ProductPrice';
import renderer from 'react-test-renderer';
import { AuthContext } from '../ContextWrapper';

describe('ProductPrice component', () => {
    test('should render correctly if do not pass price', () => {
        const component = renderer.create(
            <ProductPrice />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    test('should render correctly if price is 5$', () => {
        const component = renderer.create(
            <ProductPrice price={5} />
        );

        expect(component.toJSON()).toMatchSnapshot();
    });

    test('should render discount message if user is authenticated', () => {
        const component = renderer.create(
            <AuthContext.Provider value={{ auth: true }}>

                <ProductPrice price={5} />
            </AuthContext.Provider >
        );

        expect(component.toJSON()).toMatchSnapshot();
    });
});