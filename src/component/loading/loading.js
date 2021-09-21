import React from 'react';
import "./loading.scss";
import Loader from "./loader.png"

export default function Loading() {
    return (
        <div id="loading-animation">
            <div>
                <img src={Loader} alt="" />
            </div>
        </div>
    )
}