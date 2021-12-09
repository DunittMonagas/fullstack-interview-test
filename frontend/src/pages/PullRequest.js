

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

            <div className="table-responsive-sm">
                    <table className="table table-hover table-sm">
                        <thead className="thead-dark">
                            <tr>
                                <th style={{color: 'black'}}>Base Branch</th>
                                <th style={{color: 'black'}}>Compare Branch</th>
                                <th style={{color: 'black'}}>Author</th>
                                <th style={{color: 'black'}}>Title</th>
                                <th style={{color: 'black'}}>Description</th>
                                <th style={{color: 'black'}}>Status</th>
                                <th style={{color: 'black'}}>Conflicts</th>
                                <th style={{color: 'black'}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <PullRequest />
                        </tbody>
                    </table>
                </div>
        </>
    );
};

export default ListPullRequest;
