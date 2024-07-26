import React from "react";
import Current from "../component/Body/Current";
import Details from "../component/Body/Details";
import './today.css';

export default function Today(){    

    return(
        <div className="today--container">
            <Current />
            <Details />
        </div>
    )
}