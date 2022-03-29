/* eslint-disable testing-library/no-unnecessary-act */
import { act} from '@testing-library/react';
import axios from 'axios';
import { Post } from '../components/Post';
import {
    componentRenderByMemoryRouter,
    elementGetByTestId,
    elementGetBytext,
} from '../utils/testUtils';

describe('Test the post Component', () => {
    beforeEach(() => {
        jest.spyOn(axios, 'get').mockResolvedValue({
            data: {
                hits: [
                    {
                        created_at: '2022-02-12T12:10:12:000z',
                        title: 'Can GPT-3 AI rite comedy?',
                        url: 'https://robmanuelfuckyeah.substack.com/p/someone-needs-to-stop-me-playing',
                        author: 'rossvor',
                        created_at_i: 1644667812,
                        objectID: '303121821',
                    },
                ],
            },
        });
    });

    test('should render Post component', async () => {
        await act(async () => {
            componentRenderByMemoryRouter('/', <Post />);
        });
        elementGetBytext('Post');
    });

    test('should render post list', async () => {
        await act(async () => {
            componentRenderByMemoryRouter('/', <Post />);
        });
        elementGetByTestId('post-component-testid');
    });

    test('should render pagination', async () => {
        await act(async () => {
            componentRenderByMemoryRouter('/', <Post />);
        });
        elementGetByTestId('pagination');
    });
});
