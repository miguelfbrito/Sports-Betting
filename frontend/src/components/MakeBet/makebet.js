import React, { Component } from 'react';
import './makebet.css';

class makebet extends Component {
    constructor(props) {
        super(props);
        this.state = { events: [] }
    }


    componentDidMount() {
        // TODO : substituir pela API call
        this.setState({
            events: 
                {
                    "name": "Arsenal x Chelsea",
                    "oddSelected": "2.85",
                    "Result" : "1",
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
            Ganhos : value,
        });
        console.log(this.state);
    }


    render() {


        return ( 
            <div className="event-title">
                <p className="info-par">Boletim de apostas</p>
                <div className="events-container shadow">
                    <div className="row">
                        <div className="col">
                            <p className="bet-titles">Event:</p>
                        </div>
                        <div className="col">
                            <p className="test">{this.state.events.name}</p>
                        </div>
                        <div className="col">
                            <p className="bet-titles">Result:</p>
                        </div>
                        <div className="col">
                            <p className="test">{this.state.events.Result}</p>
                        </div>
                        <div className="col">
                            <p className="bet-titles">Odd:</p>
                        </div>
                        <div className="col">
                            <p className="test">{this.state.events.oddSelected}</p>
                        </div>
                        <div className="col">
                            <p className="bet-titles">Earning:</p>
                        </div>
                        <div className="col">
                            <p className="test">{this.state.events.Ganhos + " €"}</p>
                        </div>
                        <div className="col">
                            <p className="bet-titles">Amount:</p>
                        </div>
                        <div className="col">
                            <form>
                            <input type="number" className="bet-amount" placeholder="Amount to bet" id="montante" onInput={this.changeAmount.bind(this)}></input>
                            <button id="bet-place">Bet</button>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
        );
    }
}

export default makebet;