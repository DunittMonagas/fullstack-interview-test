

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
            "conflict": pullRequest["conflict"],
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
            element => element.id == id
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
                        conflict,
                        conflictDescription,
                    } = pullRequest;

                    return (
                        <ul key={id} className="list-group list-group-horizontal">
                            <li className="list-group-item">{baseBranch}</li>
                            <li className="list-group-item">{compareBranch}</li>
                            <li className="list-group-item">{author}</li>
                            <li className="list-group-item">{title}</li>
                            <li className="list-group-item">{description}</li>
                            <li className="list-group-item">{pullRequestStatus}</li>
                            {conflict &&
                                <li className="list-group-item">{conflictDescription}</li>
                            }
                            {pullRequestStatus === 'OP' &&
                                <button 
                                    type="button" 
                                    className="btn btn-success btn-sm" 
                                    disabled={pullRequestStatus != 'OP'}
                                    onClick={() => this.handleChangeStatus(id, 'MD')}
                                >
                                    Merge
                                </button>
                            }
                            {pullRequestStatus === 'OP' &&
                                <button 
                                    type="button" 
                                    className="btn btn-danger btn-sm" 
                                    disabled={pullRequestStatus != 'OP'}
                                    onClick={() => this.handleChangeStatus(id, 'CL')}
                                >
                                    Close
                                </button>
                            }
                            {pullRequestStatus === 'MD' &&
                                <button 
                                    type="button" 
                                    className="btn btn-success btn-sm" 
                                    disabled
                                >
                                    Merged
                                </button>
                            }
                            {pullRequestStatus === 'CL' &&
                                <button 
                                    type="button" 
                                    className="btn btn-danger btn-sm" 
                                    disabled
                                >
                                    Closed
                                </button>
                            }
                        </ul>
                    );
                })}
            </>
        );
    };
};
