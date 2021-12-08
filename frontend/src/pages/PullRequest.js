

import React from "react";
import { Link } from 'react-router-dom';


import PullRequest from "../components/PullRequest";


const ListPullRequest = () => {
    return (
        <>
            <h1>Pull Request</h1>
            <Link to="/pullrequestform">
                <button className='btn btn-primary' type="button">Add</button>
            </Link>
            <PullRequest />
        </>

    );
};

export default ListPullRequest;
