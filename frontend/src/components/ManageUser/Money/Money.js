import React from 'react';

import './Money.css';


const Money = (props) => {

    const { user } = props;
    return (
        <div>
        <div className="row">
        <div className="col-sm-3">
            <p className="user-titles">Withdraw:</p>
            <p className="user-titles">Amount:</p>
        </div>
        <div className="col-sm-9">
        <form>
            <input type="number" className="input-money" placeholder="Amount to Withdraw"></input>
            <button className="money-button" >Withdraw</button>
        </form>
        </div>
        </div>
<hr />

        <div className="row">
        <div className="col-sm-3">
            <p className="user-titles">Deposit:</p>
            <p className="user-titles">Amount:</p>
        </div>
        <div className="col-sm-9">
        <form>
            <input type="number"  className="input-money" placeholder="Amount to Deposit"></input>
            <button className="money-button" >Deposit</button>
        </form>
        </div>
        </div>
        </div>
    );
}

export default Money;