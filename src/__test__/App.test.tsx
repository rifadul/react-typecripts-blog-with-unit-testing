/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import App from '../App';
import axios from 'axios';
import {
    componentRenderByMemoryRouter,
    toBeExpectByTestId,
    toBeExpectByText,
} from '../utils/testUtils';
import { act } from '@testing-library/react';
import { mockData } from './MockData';

describe('test for app component', () => {
    beforeEach(() => {
        jest.spyOn(axios, 'get').mockResolvedValue({
            data: {
                hits: [mockData[0]],
            },
        });
    });

    test('renders app component properly', async () => {
        await act(async () => {
            componentRenderByMemoryRouter('/', <App />);
        });
        toBeExpectByTestId('app-component-testid');
    });

    test('should render home component', async () => {
        await act(async () => {
            componentRenderByMemoryRouter('/', <App />);
        });
        toBeExpectByText('Post');
    });

    test('should render postDetails component', async () => {
        await act(async () => {
            componentRenderByMemoryRouter('/post-details/2/', <App />);
        });
        toBeExpectByText('Post Details');
    });

    test('should render 404 page', async () => {
        await act(async () => {
            componentRenderByMemoryRouter(
                '/post-details/2/hjgsdfjghsdjfg',
                <App />
            );
        });
        toBeExpectByText('404 Page Not Found');
    });
});
