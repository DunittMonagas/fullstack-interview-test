

import axios from 'axios';
import React, { Component } from 'react';


export default class Commit extends Component {

    constructor(commit, props){
        super(props)
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

        const response = await axios.get(
            '/api/v1.0/commits/' + this.state.sha
        )
        const dataCommit = response.data;

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
                <h1>Commit Detail</h1>
                <div className="card border-dark">
                    <div className="card-header">{this.state.message}</div>
                    <div className="card-body text-dark">
                        <footer class="blockquote-footer"><cite>{this.state.filesChanged} files changed</cite></footer>
                        <footer class="blockquote-footer">{this.state.name} ({this.state.email}) committed on <cite>{date}</cite></footer>
                    </div>
                </div>
            </>
        );
    };
};