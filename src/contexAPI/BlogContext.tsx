import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export interface InitPost {
    title: string;
    url: string;
    created_at: Date;
    author: string;
    objectID: number;
}
export type NewsArrayType = InitPost[];

export type NewsContextType = {
    posts: NewsArrayType;
    handleChange: (e: unknown, selectedPage: number) => void;
    page: number;
    currentPage: number;
};

const NewsContext = createContext<NewsContextType>({
    posts: [],
    handleChange: () => {},
    page: 0,
    currentPage: 1,
});

export const useNews = () => React.useContext(NewsContext);

// main function
export const Provider = ({
    children,
}: {
    children: React.ReactChild | React.ReactChild[];
}) => {
    const [posts, setPosts] = useState<InitPost[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const rowsPerPage = 20;

    // pagination
    const [page, setPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        // console.log('pa3w', value);
    };

    useEffect(() => {
        setCurrentPage(parseInt((posts.length / rowsPerPage).toString()));
    }, [posts, rowsPerPage]);

    useEffect(() => {
        getPostData();
        const interval = setInterval(() => {
            setPageNumber((pageNumber) => pageNumber + 1);
            // console.log('This will run every second!');
        }, 10000);
        return () => clearInterval(interval);
    }, [pageNumber]);

    const getPostData = async () => {
        try {
            // console.log('pagenumber', pageNumber);
            const response = await axios.get(
                `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`
            );
            // console.log('new data get', response.data.hits);
            // console.log('add data get', [...posts, ...response.data.hits]);

            setPosts((posts) => [...posts, ...response.data.hits]);
        } catch (error) {
            console.error(error);
        }
    };

    const contextValue = {
        posts,
        handleChange,
        page,
        currentPage,
    };
    return (
        // <NewsContext.Provider value={contextValue}>
        //     {children}
        // </NewsContext.Provider>
        <h1>ldjfh</h1>
    );
};
