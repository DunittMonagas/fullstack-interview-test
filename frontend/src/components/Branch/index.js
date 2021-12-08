


import axios from 'axios';
import Select from 'react-select';
import React, { Component } from 'react';

import { ListCommits } from './ListCommits';


export default class Branch extends Component {

    constructor(props){
        super(props)
        this.state = {
            // branches
            options: [],
            id: "",
            label: "",
            selected: "", 
            commits: null, 
        }
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

    handleChange(e){
        this.setState({
            id: e.value, 
            label: e.label, 
            selected: e.selected,
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
                <div className="container">
                    <Select 
                        value={this.state.selected}
                        options={this.state.options} 
                        onChange={this.handleChange.bind(this)} 
                    />
                </div>

                <div className="container">
                    {/* {this.state.commits} */}
                    {this.state.label &&
                        <ListCommits name={this.state.label} />
                    }
                    {/* <ListCommits name="develop" /> */}
                </div>
            </>
        );
    };
};
