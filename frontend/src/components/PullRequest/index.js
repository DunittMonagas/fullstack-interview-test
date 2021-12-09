

import axios from 'axios';
import React, { Component } from 'react';


export default class PullRequest extends Component {

    constructor(props){
        super(props)
        this.state = {
            pullRequestData: [], 
        }
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }

    async getOptions(){

        axios.defaults.baseURL = 'http://localhost:8000';
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common['Content-Type'] = 'application/json';

        const response = await axios.get('/api/v1.0/pull-request/')
        
        const pullRequestData = response.data.map((pullRequest, index) => ({
            "id": pullRequest["id"],
            "baseBranch": pullRequest["base_branch"],
            "compareBranch": pullRequest["compare_branch"],
            "author": pullRequest["author"],
            "title": pullRequest["title"],
            "description": pullRequest["description"],
            "pullRequestStatus": pullRequest["status"],
            "conflictDescription": pullRequest["conflict_description"],
        }))

        this.setState({pullRequestData: pullRequestData})
    
    }

    componentDidMount(){
        this.getOptions()
    }

    handleChangeStatus(id, newStatus) {

        axios.defaults.baseURL = 'http://localhost:8000';
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common['Content-Type'] = 'application/json';

        const objIndex = this.state.pullRequestData.findIndex((
            element => element.id === id
        ));

        axios.patch(`/api/v1.0/pull-request/${id}/`, {status: newStatus})
            .then(response => {

                let items = [...this.state.pullRequestData];

                let item = {
                    ...items[objIndex],
                    pullRequestStatus: newStatus
                }

                items[objIndex] = item;

                this.setState({pullRequestData: items});
                alert("Success!");
            })
            .catch(error => {
                alert("Error!");
            });

    };

    render() {

        return (    
            <>
                {this.state.pullRequestData.map((pullRequest, index) => {
                    
                    const {
                        id,
                        baseBranch,
                        compareBranch,
                        author,
                        title,
                        description,
                        pullRequestStatus,
                        conflictDescription,
                    } = pullRequest;

                    const statusMapper = {
                        OP: 'Open',
                        MD: 'Merged',
                        CL: 'Closed',
                    }

                    return (
                        <tr key={id}>
                            <td>{baseBranch}</td>
                            <td>{compareBranch}</td>
                            <td>{author}</td>
                            <td>{title}</td>
                            <td>{description}</td>
                            <td>{statusMapper[pullRequestStatus]}</td>
                            <td>{conflictDescription}</td>
                            <td>
                                {pullRequestStatus === 'OP' &&
                                    <button 
                                        type="button" 
                                        className="btn btn-success btn-sm" 
                                        disabled={pullRequestStatus !== 'OP'}
                                        onClick={() => this.handleChangeStatus(id, 'MD')}
                                    >
                                        Merge
                                    </button>
                                } 
                                {pullRequestStatus === 'OP' &&
                                    <button 
                                        type="button" 
                                        className="btn btn-danger btn-sm" 
                                        disabled={pullRequestStatus !== 'OP'}
                                        onClick={() => this.handleChangeStatus(id, 'CL')}
                                    >
                                        Close
                                    </button>
                                }
                            </td>
                        </tr>
                    );
                })}
            </>
        );
    };
};
