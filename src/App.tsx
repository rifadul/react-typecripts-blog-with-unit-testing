import React from 'react';
import { Post } from './components/Post';
import { PostDetails } from './components/PostDetails';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className="App" data-testid="app-component-testid">
            <Routes>
                <Route path="/" element={<Post />} />
                <Route path="/post-details/:id" element={<PostDetails />} />
                <Route path="*" element={<p>404 Page Not Found</p>} />
            </Routes>
        </div>
    );
}

export default App;
