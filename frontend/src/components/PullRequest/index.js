

import axios from 'axios';
import React, { Component } from 'react';


export default class PullRequest extends Component {

    constructor(props){
        super(props)
        this.state = {
            pullRequestData: [], 
            // base_branch: "",
            // compare_branch: "",
            // author: "",
            // title: "",
            // description: "",
            // pullRequestStatus: "",
            // conflict: false,
            // conflict_description: "",
        }
    }

    async getOptions(){

        axios.defaults.baseURL = 'http://localhost:8000';
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common['Content-Type'] = 'application/json';

        const response = await axios.get('/api/v1.0/pull-request/')
        // console.log(response.data);
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
    
        // const options = pullRequestData.map((pullRequest, index) => ({
            // "value": index,
            // "label" : name
        // }))

        this.setState({pullRequestData: pullRequestData})
    
    }

    handleChange(e){
        this.setState({
            pullRequestData: e.pullRequestData
            // id: e.value, 
            // label: e.label, 
            // selected: e.selected,
            // commits: <ListCommits name={e.label} />, 
        })
    }

    // componentDidUpdate() {
    //     document.getElementById("mydiv").innerHTML =
    //     "The updated favorite is " + this.state.label;
    // }

    componentDidMount(){
        this.getOptions()
    }

    handleClose = (id) => {

        axios.defaults.baseURL = 'http://localhost:8000';
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common['Content-Type'] = 'application/json';

        const objIndex = this.state.pullRequestData.findIndex((
            element => element.id == id
        ));

        const oldPullRequest = this.state.pullRequestData[objIndex];

        const pullRequest = {
            "id": oldPullRequest["id"],
            "base_branch": oldPullRequest["baseBranch"],
            "compare_branch": oldPullRequest["compareBranch"],
            "author": oldPullRequest["author"],
            "title": oldPullRequest["title"],
            "description": oldPullRequest["description"],
            "conflict": oldPullRequest["conflict"],
            "conflict_description": oldPullRequest["conflictDescription"],
            status: 'CL',
        };

        axios.put(`/api/v1.0/pull-request/${id}/`, pullRequest)
            .then(response => {

                let items = [...this.state.pullRequestData];

                let item = {
                    ...items[objIndex],
                    pullRequestStatus: 'CL'
                }

                items[objIndex] = item;

                this.setState({items});
            })
            .catch(error => {
                alert("Error!");
            });
    };

    handleMerge = (id) => {

    };

    render() {

        return (    
            <>
                {this.state.pullRequestData.map((pullRequest) => {
                    
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
                                <button type="button" className="btn btn-success btn-sm" onClick={() => this.handleMerge(id)}>Merge</button>
                                // <button type="button" className="btn btn-danger">Close</button>
                            }
                            {pullRequestStatus === 'OP' &&
                                // <button type="button" className="btn btn-success">Merge</button>
                                <button type="button" className="btn btn-danger btn-sm" onClick={() => this.handleClose(id)}>Close</button>
                            }
                            {pullRequestStatus === 'MD' &&
                                <button type="button" className="btn btn-success btn-sm" disabled>Merged</button>
                            }
                            {pullRequestStatus === 'CL' &&
                                <button type="button" className="btn btn-danger btn-sm" disabled>Closed</button>
                            }
                        </ul>
                    );
                })}
            </>
        );
    };
};
