import React from 'react';
import Header from './Header';
import renderer from 'react-test-renderer';

jest.mock('react-router-dom', () => ({
    Link: 'Link'
}));

describe('Header component', () => {
    test('should render correctly', () => {
        const component = renderer.create(
            <Header />
        )

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});