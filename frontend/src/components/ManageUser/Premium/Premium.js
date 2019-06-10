import React from 'react';

import './Premium.css';


const Premium = (props) => {

    const { user } = props;
    return (
        <div>
        <div className="premium">
            <p className="premium-titles">Be a Premium user and get many more advantages!</p>
            <button id="button">Be Premium</button>
        </div>
        </div>
    );
}

export default Premium;