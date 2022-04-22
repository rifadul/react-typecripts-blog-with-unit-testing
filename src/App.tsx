import Post from './components/Post';
import { PostDetails } from './components/PostDetails';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';

export interface InitPost {
    title: string;
    url: string;
    created_at: string;
    author: string;
    objectID: number;
}

export interface ContexType {
    posts: InitPost[];
    handleChange: (_event: React.ChangeEvent<unknown>, value: number) => void;
    page: number;
    currentPage: number;
    rowsPerPage: number;
    handelError: boolean;
}

function App() {
    const [posts, setPosts] = useState<InitPost[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [handelError, setHandelError] = useState<boolean>(false);

    // pagination
    const [page, setPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const rowsPerPage = 20;

    const getPostData = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`
            );

            posts.length === 0 ? setHandelError(true) : setHandelError(false);
            setPosts((posts) => [...posts, ...response.data.hits]);
        } catch (error) {
            setHandelError(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber]);

    // the function update pagination page number
    const handleChange = (
        _event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
    };

    useEffect(() => {
        getPostData();
        const interval = setInterval(() => {
            setPageNumber((pageNumber) => pageNumber + 1);
        }, 10000);
        return () => clearInterval(interval);
    }, [getPostData]);

    useEffect(() => {
        setCurrentPage(parseInt((posts.length / rowsPerPage).toString()));
    }, [posts]);

    const contextValue: ContexType = {
        posts,
        handleChange,
        page,
        currentPage,
        rowsPerPage,
        handelError,
    };
    return (
        <div className="App" data-testid="app-component-testid">
            <Routes>
                <Route path="/" element={<Post data={contextValue} />} />
                <Route path="/post-details/:id" element={<PostDetails />} />
                <Route path="*" element={<p>404 Page Not Found</p>} />
            </Routes>
        </div>
    );
}

export default App;
