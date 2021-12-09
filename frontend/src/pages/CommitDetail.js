

import React from "react";
import { useParams } from "react-router-dom";

import Commit from "../components/Commit";


const CommitDetail = () => {
        
    const { hexsha } = useParams();

    return (
        <>
            <Commit hexsha={hexsha}/>
        </>
    );
};

export default CommitDetail;
