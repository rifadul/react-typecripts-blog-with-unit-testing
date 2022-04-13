import  Post from '../src/components/Post';
import { PostDetails } from '../src/components/PostDetails';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export interface InitPost {
    title: string;
    url: string;
    created_at: Date;
    author: string;
    objectID: number;
}
function App() {
    const [posts, setPosts] = useState<InitPost[]>([]);
    const [pageNumber, setPageNumber] = useState(0);

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
    return (
        <div className="App" data-testid="app-component-testid">
            <Routes>
                <Route path="/" element={<Post posts={posts} />} />
                <Route path="/post-details/:id" element={<PostDetails />} />
                <Route path="*" element={<p>404 Page Not Found</p>} />
            </Routes>
        </div>
    );
}

export default App;
