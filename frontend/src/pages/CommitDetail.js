

import React from "react";
import { useParams } from "react-router-dom";

import Commit from "../components/Commit";


const CommitDetail = () => {

    console.log("Recibido CommitDetail")
    console.log("useParams", useParams());
    // console.log("useLocation", useLocation());
    
    const { hexsha } = useParams();

    return (
        <>
            <Commit hexsha={hexsha}/>
        </>
    );
};

export default CommitDetail;
