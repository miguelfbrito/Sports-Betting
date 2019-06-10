import React from 'react';

import './Bet.css';


const Bet = (props) => {

    const { bet } = props;
    return (
        <div className="row">
        <div className="col-sm-6">
            <p className="bet-info">Event:</p>
            <p className="bet-info">Odd:</p>
            <p className="bet-info">Amount:</p>
            <p className="bet-info">Earning:</p>
        </div>
        <div className="col-sm-6">
            <p className="bet-elements">{bet.name}</p>
            <p className="bet-elements">{bet.oddSelected}</p>
            <p className="bet-elements">{bet.amount}</p>
            <p className="bet-elements">{bet.Earning}</p>
        </div>
        </div>
    );
}

export default Bet;