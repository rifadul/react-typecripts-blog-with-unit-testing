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

describe('test for app component', () => {
    beforeEach(() => {
        jest.spyOn(axios, 'get').mockResolvedValue({
            data: {
                hits: [
                    {
                        created_at: '2022-02-12T12:10:12.000Z',
                        title: 'Can GPT-3 AI write comedy?',
                        url: 'https://robmanuelfuckyeah.substack.com/p/someone-needs-to-stop-me-playing',
                        author: 'rossvor',
                        created_at_i: 1644667812,
                        objectID: '30312182',
                    },
                ],
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
        // await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    });

    test('should render postDetails component', async () => {
        await act(async () => {
            componentRenderByMemoryRouter('/post-details/2/', <App />);
        });
        // componentRenderByMemoryRouter('/post-details/2/', <App />);
        toBeExpectByText('Post Details');
    });

    test('should render 404 page', async () => {
        // componentRenderByMemoryRouter(
        //     '/post-details/2/hjgsdfjghsdjfg',
        //     <App />
        // );
        await act(async () => {
            componentRenderByMemoryRouter(
                '/post-details/2/hjgsdfjghsdjfg',
                <App />
            );
        });
        toBeExpectByText('404 Page Not Found');
    });
});
