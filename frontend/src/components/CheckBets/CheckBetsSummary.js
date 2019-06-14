import React, { Component } from 'react';
import './CheckBetsSummary.css';
import Bet from './Bet/Bet';

import Api from '../../api/api';

class CheckBetsSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { bets: [] }
    }

    async componentDidMount() {
        // TODO : substituir pela API call

        const bets = await Api.fetchUserBets();
        console.log("Bets", bets);


        this.setState({
            bets: [
                {
                    "name": "Arsenal x Chelsea",
                    "oddSelected": "2.85",
                    "amount": "10.00",
                    "Earning": "28.50"
                },
                {
                    "name": "Benfica x Porto",
                    "oddSelected": "2.00",
                    "amount": "5.00",
                    "Earning": "10.00"
                }
            ]
        })

    }

    render() {
        //TODO: Adicionar um scroll para os eventos
        const { bets } = this.state;
        return (
            <div className="bet-title">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="top-bar">
                            <p className="Infodiv">Bets</p>
                        </div>

                        <div className="bet-container shadow">

                            <div>
                                <p>Open</p>
                                <p>History</p>
                            </div>

                            {/* Carousel 4 or 5 games */}
                            {/* <CurrentEventsCarousel /> */}

                            {/* List all events */}


                            {bets.map(bet => (
                                <div className="bet">
                                    <Bet bet={bet} />
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckBetsSummary;