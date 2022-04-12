import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostList from './PostList';


export interface InitPost {
    title: string;
    url: string;
    created_at: Date;
    author: string;
    objectID: number;
}

export const Post = () => {
    const [posts, setPosts] = useState<InitPost[]>([]);
    const [pageNumber, setPageNumber] = useState(0);


    useEffect(() => {
            getPostData();
            const interval = setInterval(() => {
                setPageNumber((pageNumber) => pageNumber + 1);
                console.log('This will run every second!');
            }, 10000);
            return () => clearInterval(interval);
    }, [pageNumber]);

    const getPostData = async () => {
        try {
            // console.log('pagenumber', pageNumber);
            const response = await axios.get(
                `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`
            );
            console.log('new data get', response.data.hits);
            // console.log('add data get', [...posts, ...response.data.hits]);

            setPosts((posts) => [...posts, ...response.data.hits]);
        } catch (error) {
            console.error(error); 
        }
    };

    return (
        <PostList posts={posts} />
    );
};
