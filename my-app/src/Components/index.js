//file: src/Components/index.js

import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";


import Home from './home';
import Image from './image';

const Components = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/image/:id" element={<Image />} />
            </Routes>
        </Router>
    );
};

export default Components;