

import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form, useField } from 'formik';
import React, { useState, useEffect } from 'react';


import "./PullRequestForm.css";


const MyTextInput = ({ label, ...props }) => {

    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );

};

const MyTextAreaInput = ({ label, ...props }) => {

    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea className="form-textarea" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};


const MySelect = ({ label, ...props }) => {

    const [field, meta] = useField(props);

    return (
        <div>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props} />
        {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
        ) : null}
        </div>
    );

};



const PullRequestForm = () => {
    
    const optionsStatus = ['OP', 'MD'];
    const [branches, setBranches] = useState([]);

    const getBranches = async () => {
        const response = await axios.get('http://localhost:8000/api/v1.0/branches/');
        const branches = response.data['branches'];
        setBranches(branches);
    };

    useEffect(() => {
        getBranches();
    }, []);

    const handleOnSubmit = (values, actions) => {

        const newPullRequest = {
            base_branch: values["baseBranch"],
            compare_branch: values["compareBranch"],
            author: values["author"],
            title: values["title"],
            description: values["description"],
            status: values["pullRequestStatus"],
        };

        axios({
            method: "POST",
            url: "http://localhost:8000/api/v1.0/pull-request/",
            data: newPullRequest,
        })
        .then(response => {
            actions.setSubmitting(false);
            actions.resetForm();
            alert("Success!");
        })
        .catch(error => {
            actions.setSubmitting(false);
            alert("Error!");
        });
    };

    return (
        <>
            <div id='pullrequest-form' className='container'>
                <h1>Pull Request</h1>
                <Formik
                    initialValues={{
                        baseBranch: '',
                        compareBranch: '',
                        author: '',
                        title: '',
                        description: '',
                        pullRequestStatus: '',
                    }}
                    validationSchema={Yup.object({
                        baseBranch: Yup.string()
                            .oneOf(branches, 'Invalid base branch')
                            .required('Required'),
                        compareBranch: Yup.string()
                            .oneOf(branches)
                            .when("baseBranch", (baseBranch, schema) => {
                                return schema
                                    .notOneOf([baseBranch])
                                    .required(
                                        "You must pick a compare branch and other than the base branch."
                                    );
                            }),
                        author: Yup.string()
                            .max(32, 'Must be 32 characters or less')
                            .required('Required'),
                        title: Yup.string()
                            .max(32, 'Must be 32 characters or less')
                            .required('Required'),
                        description: Yup.string()
                            .max(256, 'Must be 256 characters or less'),
                        pullRequestStatus: Yup.string()
                            .max(2, 'Must be 256 characters or less')
                            .oneOf(optionsStatus, 'Invalid status')
                            .required('Required'),
                    })}
                    onSubmit={handleOnSubmit}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <MySelect label="Base Branch" name="baseBranch">
                                <option value="">Select a branch</option>
                                {branches.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </MySelect>

                            <MySelect label="Compare Branch" name="compareBranch">
                                <option value="">Select a branch</option>
                                {branches.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </MySelect>

                            <MyTextInput
                                label="Author"
                                name="author"
                                type="text"
                                placeholder="John Doe"
                            />

                            <MyTextInput
                                label="Title"
                                name="title"
                                type="text"
                            />

                            <MyTextAreaInput
                                label="Description"
                                name="description"
                                type="text"
                            />

                            <MySelect label="Status" name="pullRequestStatus">
                                <option value="">Select a status</option>
                                <option value="OP">Open</option>
                                <option value="MD">Merge</option>
                            </MySelect>

                            <button 
                                type="submit" 
                                className='btn btn-primary' 
                                disabled={isSubmitting}
                            >
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default PullRequestForm;
