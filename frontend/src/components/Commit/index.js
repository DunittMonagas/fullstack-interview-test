

import axios from 'axios';
import React, { Component } from 'react';


export default class Commit extends Component {

    constructor(commit, props){
        super(props)
        // console.log('constructor Commit', commit, props)
        this.state = {
            name: "", 
            email: "", 
            message: "", 
            timestamps: null, 
            filesChanged: null, 
            sha: commit.hexsha,
        }
    }

    async getCommit(){

        axios.defaults.baseURL = 'http://localhost:8000';
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common['Content-Type'] = 'application/json';

        // console.log(this.state.sha)
        // console.log('/api/v1.0/commits/' + this.state.sha)

        const response = await axios.get(
            '/api/v1.0/commits/' + this.state.sha
        )
        const dataCommit = response.data;
        // console.log(dataCommit);

        this.setState({
            commits: dataCommit['commits'],
            name: dataCommit['name'], 
            email: dataCommit['email'], 
            message: dataCommit['message'], 
            timestamps: dataCommit['timestamps'],
            filesChanged: dataCommit['files_changed'],
        })
    
    }

    handleChange(e){
        this.setState({
            name: e.name, 
            email: e.email, 
            message: e.message, 
            timestamps: e.timestamps,
            filesChanged: e.filesChanged,
        })
    }

    componentDidMount(){
        this.getCommit()
    }
    
    render() {

        const date = new Date(this.state.timestamps * 1000).toLocaleString()

        return (    
            <>
                <div className="list-group">
                    <div className="list-group-item">
                        <div className="text-left">
                            <h6 className="list-group-item-heading">Auhor: {this.state.name}</h6>
                            <h6 className="list-group-item-heading">Email: {this.state.email}</h6>
                        </div>
                        <div className="text-left">
                            <h6 className="list-group-item-heading">Description</h6>
                            <p className="list-group-item-text">{this.state.message}</p>
                        </div>
                        <div className="text-left">
                            <p>{this.state.filesChanged} files changed</p>
                            <p>{date} </p>
                        </div>
                    </div>
                </div>
            </>
        );
    };
};