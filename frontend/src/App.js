

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Branch from './pages';
import Navbar from "./components/Navbar";
import PullRequest from './pages/PullRequest';


function App() {

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Branch />} />
                <Route path="/pullrequest" element={<PullRequest />} />
            </Routes>
        </Router>
    );

}

export default App;
