import React from 'react';
import { useLocation } from 'react-router-dom';
import { InitPost } from './Post';
export const PostDetails = () => {
    const { state } = useLocation();
    const post = state as InitPost;

    return (
        <div data-testid="post-details-testid">
            <h1>Post Details</h1>          
            <pre>{JSON.stringify(post,null,2)}</pre>
        </div>
    );
};

