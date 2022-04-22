/* eslint-disable testing-library/no-unnecessary-act */
import { act } from '@testing-library/react';
import axios from 'axios';
import { ContexType } from '../App';
import Post from '../components/Post';
import {
    toBeExpectByText,
    componentRenderByMemoryRouter,
    elementGetByTestId,
    elementGetBytext,
} from '../utils/testUtils';
import { mockData } from '../utils/MockData';

describe('Test the post Component', () => {
    const handleChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {};

    beforeEach(() => {
        jest.spyOn(axios, 'get').mockResolvedValue({
            data: {
                hits: [mockData[0]],
            },
        });
    });

    const contextValue: ContexType = {
        posts: mockData,
        handleChange,
        page: 1,
        currentPage: 1,
        rowsPerPage: 20,
        handelError: false,
    };

    test('should render Post component', async () => {
        await act(async () => {
            componentRenderByMemoryRouter('/', <Post data={contextValue} />);
        });
        elementGetBytext('Post');
    });

    test('should render post list', async () => {
        await act(async () => {
            componentRenderByMemoryRouter('/', <Post data={contextValue} />);
        });
        elementGetByTestId('post-component-testid');
    });

    test('should render pagination', async () => {
        await act(async () => {
            componentRenderByMemoryRouter('/', <Post data={contextValue} />);
        });
        elementGetByTestId('pagination');
    });

    test('find post title', async () => {
        await act(async () => {
            componentRenderByMemoryRouter('/', <Post data={contextValue} />);
        });
        toBeExpectByText('Can GPT-3 AI rite comedy?');
    });
    test('find post url', async () => {
        await act(async () => {
            componentRenderByMemoryRouter('/', <Post data={contextValue} />);
        });
        toBeExpectByText(
            'https://robmanuelfuckyeah.substack.com/p/someone-needs-to-stop-me-playing'
        );
    });
    test('find post author', async () => {
        await act(async () => {
            componentRenderByMemoryRouter('/', <Post data={contextValue} />);
        });
        toBeExpectByText('rossvor');
    });
    test('find post create at', async () => {
        await act(async () => {
            componentRenderByMemoryRouter('/', <Post data={contextValue} />);
        });
        toBeExpectByText('2022-02-12T12:10:12:000z');
    });

    test('Api test', async () => {
        const response = await axios.get(
            `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${0}`
        );

        expect(response.data).toBeDefined();
        expect(response.data.hits[0].title).toBe(mockData[0].title);
        expect(response.data.hits[0].url).toBe(mockData[0].url);
        expect(response.data.hits[0].author).toBe(mockData[0].author);
        expect(response.data.hits[0].created_at).toBe(mockData[0].created_at);
    });
});
