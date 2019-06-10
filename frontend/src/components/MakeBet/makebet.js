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
            <div className="events-title">
                <p className="Infodiv">Boletim de apostas</p>
                <div className="events-container shadow">
                    <div className="row">
                        <div className="col-sm-4">
                            <p className="bet-titles">Event:</p>
                            <p className="bet-titles">Result:</p>
                            <p className="bet-titles">Odd:</p>
                            <p className="bet-titles">Earning:</p>
                            <p className="bet-titles">Amount:</p>
                        </div>
                        <div className="col-sm-8">
                            <p>{this.state.events.name}</p>
                            <p>{this.state.events.Result}</p>
                            <p>{this.state.events.oddSelected}</p>
                            <p id="ganhos">{this.state.events.Ganhos + " €"}</p>
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