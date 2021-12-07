

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Branch from './pages';
import Navbar from "./components/Navbar";
import PullRequest from './pages/PullRequest';
import CommitDetail from './pages/CommitDetail';


function App() {

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Branch />} />
                <Route path="/commit/:hexsha" exact element={<CommitDetail />} />
                <Route path="/pullrequest" element={<PullRequest />} />
            </Routes>
        </Router>
    );

}

export default App;
