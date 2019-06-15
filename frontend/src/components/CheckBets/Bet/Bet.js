import React from 'react';

import './Bet.css';


const Bet = (props) => {

    const { bet } = props;

    console.log("Printing bet", bet)

    let betContainerClassName = '';

    if (bet.result === 'LOST') {
        betContainerClassName += " lost-bet";
    } else if (bet.result === 'WON') {
        betContainerClassName += " won-bet";
    }

    return (
        <div className={betContainerClassName}>
            <div className="row">
                <div className="col-md-3">
                    <p className="bet-info">{bet.eventName}</p>
                </div>
                <div className="col-md-3">
                    <p className="bet-info">Bet: {bet.bettypeName}</p>
                </div>
                <div className="col-md-3">
                    <p className="bet-info">Wager: {bet.wager}</p>
                </div>
                <div className="col-md-3">
                    <p className="bet-info">Earnings: {bet.earnings}</p>
                </div>
            </div >
        </div>
    );
}

export default Bet;