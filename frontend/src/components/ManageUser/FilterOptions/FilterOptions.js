import React, { Component } from 'react';

import "./FilterOptions.css";

class FilterBets extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        return (
            
            <div className="options-filter-container">
                <ul className="options-filters">
                    <li >Profile</li>
                    <li>Edit Profile</li>
                    <li>Deposit/withdraw money</li>
                    <li>Premium</li>
                </ul>
                <hr />

            </div>

        );
    }
}

export default FilterBets;