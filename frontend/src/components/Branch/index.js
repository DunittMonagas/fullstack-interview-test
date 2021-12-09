


import axios from 'axios';
import Select from 'react-select';
import React, { Component } from 'react';


import ListCommits  from './ListCommits';


export default class Branch extends Component {    
    /* 
    Displays each branch with its respective commits. 
    */
    constructor(props){
        super(props)
        this.state = {
            // branches
            options: [],
            id: "",
            label: "",
            selected: "", 
            commits: [], 
        }
        this.handleChange = this.handleChange.bind(this)
    }

    async getOptions(){

        axios.defaults.baseURL = 'http://localhost:8000';
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common['Content-Type'] = 'application/json';

        const response = await axios.get('/api/v1.0/branches/')
        const branchData = response.data['branches']
    
        const options = branchData.map((name, index) => ({
            "value": index,
            "label" : name
        }))

        this.setState({options: options})
    
    }

    async getCommits(branchName){
        
        axios.defaults.baseURL = 'http://localhost:8000';
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common['Content-Type'] = 'application/json';

        await axios.get(
            '/api/v1.0/branches/' + branchName
        ).then(response => {
            this.setState({commits: response.data['commits']});
        })
    
    }

    handleChange(e){
        
        this.getCommits(e.label);
        this.setState({
            id: e.value, 
            label: e.label, 
            selected: e.selected,
        })
    }

    componentDidMount(){
        this.getOptions()
    }

    render() {

        return (    
            <>
                <div className="container">
                    <Select 
                        value={this.state.selected}
                        options={this.state.options} 
                        onChange={this.handleChange} 
                    />
                </div>

                <div className="table-responsive-sm">
                    <table className="table table-hover table-sm">
                        <thead className="thead-dark">
                            <tr>
                                <th style={{color: 'black'}}>Commit</th>
                                <th style={{color: 'black'}}>Name</th>
                                <th style={{color: 'black'}}>Summary</th>
                                <th style={{color: 'black'}}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ListCommits commits={this.state.commits} />
                        </tbody>
                    </table>
                </div>
            </>
        );
    };
};
