import React, { Component } from 'react';
import './FilterBets.css';

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
                    <li >Open Bets</li>
                    <li>Bet History</li>
                </ul>
                <hr />

            </div>

        );
    }
}

export default FilterBets;