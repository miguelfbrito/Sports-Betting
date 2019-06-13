import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './EventsSummary.css';
import CurrentEventsCarousel from '../CurrentEventsCarousel/CurrentEventsCarousel';
import Event from './Event/Event';
import EventFilter from './EventFilter/EventFilter';
import BettingSlip from '../BettingSlip/BettingSlip';

import Api from '../../api/api';
import BetTypesStruct from '../utils/bettypesstruct';

class EventsSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { events: [], loading: true, showBettingSlip: false, bettingSlipBets: [] }
    }

    async componentDidMount() {
        // TODO : substituir pela API call

        let listEvents = await Api.fetchAvailableEvents();

        listEvents = BetTypesStruct.organizeEventsSummary(listEvents)


        this.setState({ events: listEvents });

    }

    addBetToBettingSlip = (bet, event) => {

        let currentBets = this.state.bettingSlipBets;

        currentBets.push({
            name: event.name,
            eventOid: event.oid,
            odd: bet.odd,
            bettypeName: bet.bettypeName,
            bettypeOid: bet.bettypeOid,
            gains: 0,
            wager: 0
        })

        if (currentBets.length > 0) {
            this.setState({ bettingSlipBets: currentBets, showBettingSlip: true });
        }
    }

    onPlaceBet = async () => {

        console.log("Placing bet!")
        console.log(this.state.bettingSlipBets);
        await Api.placeBets(this.state.bettingSlipBets)
        console.log("Placed all the bets!");

    }


    render() {
        const { events, showBettingSlip, bettingSlipBets } = this.state;

        console.log("Eventos", events)

        if (!events)
            return (<div></div>)


        const bettingSlipSection = (
            <div className="col-sm-3">
                <BettingSlip bets={bettingSlipBets} onPlaceBet={this.onPlaceBet} />
            </div>);



        return (
            <div className="events-title">
                <div className="row">
                    <div className={showBettingSlip ? 'col-sm-9' : 'col-sm-12'}>
                        <div className="top-bar">
                            <p className="Infodiv">Eventos a decorrer</p>
                        </div>
                        <div className="events-container shadow">


                            {/* Carousel 4 or 5 games */}
                            {/* <CurrentEventsCarousel /> */}

                            {/* List all events */}

                            <EventFilter />

                            {events.map(event => (

                                <div className="event">
                                    <Event event={event} addBetToBettingSlip={this.addBetToBettingSlip} onPlaceBet={this.onPlaceBet} />

                                    <Link to={'/events/' + event.oid}>
                                        <button type="button" className="btn" id="view-all-bettypes">+</button>
                                    </Link>
                                </div>
                            ))}

                        </div>
                    </div>

                    {showBettingSlip ? bettingSlipSection : ''}
                </div>
            </div>
        );
    }
}

export default EventsSummary;