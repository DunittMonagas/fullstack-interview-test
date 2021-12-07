

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

    render() {

        return (    
            <>
                {this.state.pullRequestData.map((pullRequest, index) => {
                    
                    const {
                        baseBranch,
                        compareBranch,
                        author,
                        title,
                        description,
                        pullRequestStatus,
                        conflict,
                        conflictDescription,
                    } = pullRequest;
                    // const {summary, name, hexsha, timestamps} = pullRequest
                    // const date = new Date(timestamps * 1000).toLocaleString()

                    return (
                        <ul key={index} className="list-group list-group-horizontal">
                            <li className="list-group-item">{baseBranch}</li>
                            <li className="list-group-item">{compareBranch}</li>
                            <li className="list-group-item">{author}</li>
                            <li className="list-group-item">{title}</li>
                            <li className="list-group-item">{description}</li>
                            <li className="list-group-item">{pullRequestStatus}</li>
                            {conflict &&
                                <li className="list-group-item">{conflictDescription}</li>
                            }
                        </ul>
                    );
                })}
            </>
        );
    };
};
