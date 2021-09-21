import React from 'react';
import HomeRender from './homeRender';
import './home.scss'

const URL = "https://res.cloudinary.com/pcndb/image/upload/v1627370228/sample.jpg";

const Homepage = () => {

    return (
        <HomeRender url={URL}></HomeRender>
    )
}

export default Homepage;