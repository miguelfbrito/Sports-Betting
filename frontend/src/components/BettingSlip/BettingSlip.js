import React, { Component } from 'react';
import './BettingSlip.css';

class BettingSlip extends Component {

    constructor(props) {
        super(props);
        this.state = { bets: [] }
    }


    componentDidMount() {
        // TODO : substituir pela API call
        this.setState({
            bets:
            {
                "name": "Arsenal x Chelsea",
                "oddSelected": "2.85",
                "Result": "1",
                "Ganhos": "0.00",
                "Montante": "0.00",
            }
        });
    }

    //Nesta função colocar a que seja atualizado o valor dos "Ganhos" consoante o valor inserido
    changeAmount = (e) => {
        var value = e.target.value;
        console.log(value);
        this.setState({
            Ganhos: value,
        });
        console.log(this.state);
    }


    render() {


        return (
            <div className="event-title">

                <div className="top-bar">
                    <p className="info-par">Boletim de apostas</p>
                </div>
                <div className="events-container shadow bettingslip">
                    <div className="row">
                        <div className="col-md-4 col-sm-12">
                            <p className="bet-titles">Event:</p>
                        </div>
                        <div className="col-md-8 col-sm-12">
                            <p className="test">{this.state.bets.name}</p>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <p className="bet-titles">Result:</p>
                        </div>
                        <div className="col-md-8 col-sm-12">
                            <p className="test">{this.state.bets.Result}</p>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <p className="bet-titles">Odd:</p>
                        </div>
                        <div className="col-md-8 col-sm-12">
                            <p className="test">{this.state.bets.oddSelected}</p>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <p className="bet-titles">Earning:</p>
                        </div>
                        <div className="col-md-8 col-sm-12">
                            <p className="test">{this.state.bets.Ganhos + " €"}</p>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <p className="bet-titles">Amount:</p>
                        </div>
                        <div className="col-md-8 col-sm-12">
                            <form>
                                <input type="number" className="bet-amount" placeholder="0.00 €" id="montante" onInput={this.changeAmount.bind(this)}></input>
                                <button id="bet-place">Bet</button>
                            </form>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
                <div id="place-bet">
                    <button className="btn btn-info" type="submit">Bet</button>
                </div>
            </div>
        );
    }
}

export default BettingSlip;