

import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';


const ListCommits = ({
    commits
}) => {
    return (
        <>
            <h1>Commits</h1>
            {commits.map((commit, index) => {
                
                const {summary, name, hexsha, timestamps} = commit
                const date = new Date(timestamps * 1000).toLocaleString()

                return (
                    <ul key={index} className="list-group list-group-horizontal">
                        <li className="list-group-item">{summary}</li>
                        <li className="list-group-item">{name}</li>
                        <li className="list-group-item">
                            <Link to={`/commit/${hexsha}`} hexsha={hexsha}>
                                {hexsha.substr(0, 7)}
                            </Link>                  
                        </li>              
                        <li className="list-group-item">{date}</li>
                    </ul>
                );
            })}
        </>
    );
};
  
  export default ListCommits;
