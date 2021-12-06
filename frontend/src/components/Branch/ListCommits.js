

import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';


export class ListCommits extends Component {

    constructor(branch, props){
        super(props)
        console.log("constructor", branch.name)
        this.state = {
            // branches
            commits: [],
            branchName: branch.name,
        }
    }

    async getCommits(){

        axios.defaults.baseURL = 'http://localhost:8000';
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common['Content-Type'] = 'application/json';

        console.log(this.state.branchName)
        console.log('/api/v1.0/branches/' + this.state.branchName)

        const response = await axios.get(
            '/api/v1.0/branches/' + this.state.branchName
        )
        console.log(response.data)
        this.setState({commits: response.data['commits']})
    
    }

    handleChange(e){
        this.setState({
            commits: e.commits,
        })
    }

    componentDidMount(){
        this.getCommits()
    }
    
    render() {
        return (    
            <>
                <h1>Commits</h1>
                    {this.state.commits.map((commit) => {
                        
                        const {summary, name, hexsha, timestamps} = commit
                        const date = new Date(timestamps * 1000).toLocaleString()

                        return (
                            // <Link to={""}
                            <ul className="list-group list-group-horizontal">
                                <li className="list-group-item">{summary}</li>
                                <li className="list-group-item">{name}</li>
                                <li className="list-group-item">{hexsha.substr(0, 7)}</li>
                                <li className="list-group-item">{date}</li>
                            </ul>
                        );
                    })}
            </>
        );
    };
};