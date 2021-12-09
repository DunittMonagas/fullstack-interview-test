

import React from 'react';
import { Link } from 'react-router-dom';


const ListCommits = ({
    commits
}) => {
    return (
        <>
            {commits.map((commit, index) => {
                
                const {summary, name, hexsha, timestamps} = commit
                const date = new Date(timestamps * 1000).toLocaleString()

                return (
                    <tr key={hexsha}>
                        <td>
                            <Link to={`/commit/${hexsha}`} hexsha={hexsha}>
                                {hexsha.substr(0, 7)}
                            </Link>
                        </td>
                        <td>{name}</td>
                        <td>{summary}</td>
                        <td>{date}</td>
                    </tr>
                );
            })}
        </>
    );
};
  
  export default ListCommits;
