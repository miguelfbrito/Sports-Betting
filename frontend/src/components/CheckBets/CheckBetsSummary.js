import React, { Component } from 'react';
import './CheckBetsSummary.css';
import CurrentEventsCarousel from '../CurrentEventsCarousel/CurrentEventsCarousel';
import Bet from './Bet/Bet';
import BetFilter from './FilterBets/FilterBets';

class CheckBetsSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { bets: [] }
    }

    componentDidMount() {
        // TODO : substituir pela API call

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
                <p className="Info-div">Bets</p>
                <div className="bet-container shadow">


                    {/* Carousel 4 or 5 games */}
                    {/* <CurrentEventsCarousel /> */}

                    {/* List all events */}

                    <BetFilter />

                    {bets.map(bet => (
                        <div className="bet">
                            <Bet bet={bet} />
                        </div>
                    ))}

                </div>
            </div>
        );
    }
}

export default CheckBetsSummary;