import React from 'react';
import landingImg from '../../images/landing4.svg';

const landing = () => (
    <div className="landing-wrapper">
        <div className="landing">
            <p>Personal <br />Planning App</p>
            <img src={landingImg} alt="planning img"/>
        </div>
    </div>
)

export default landing;