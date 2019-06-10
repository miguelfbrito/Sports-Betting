import React, { Component } from 'react';


class FilterBets extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        return (
            
            //Colocar as imagens aqui em vez dos nomes
            <div className="bet-filter-container">
                <ul className="bet-filters">
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