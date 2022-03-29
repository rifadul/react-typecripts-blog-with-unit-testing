/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import {
    componentRenderByMemoryRouter,
    toBeExpectByText,
} from '../utils/testUtils';
import { PostDetails } from '../components/PostDetails';

describe('Test post details component', () => {
    test('should render postDetails component', () => {
        componentRenderByMemoryRouter('/post-details/2/', <PostDetails />);
        toBeExpectByText('Post Details');
    });
});
