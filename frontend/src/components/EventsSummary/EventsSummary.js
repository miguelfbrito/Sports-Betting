import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './EventsSummary.css';
import Event from './Event/Event';
import BettingSlip from '../BettingSlip/BettingSlip';

import Api from '../../api/api';
import BetTypesStruct from '../utils/bettypesstruct';

class EventsSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { events: [], loading: true, showBettingSlip: false, bettingSlipBets: [], sportFilter: 'All' }
    }

    async componentDidMount() {
        // TODO : substituir pela API call

        let listEvents = await Api.fetchAvailableEvents();

        listEvents = BetTypesStruct.organizeEventsSummary(listEvents)


        this.setState({ events: listEvents });

    }

    addBetToBettingSlip = (bet, event) => {

        let currentBets = this.state.bettingSlipBets;

        // Verify if it doesn't exist already

        const matchSame = currentBets.filter(b => b.bettypeOid === bet.bettypeOid && b.eventOid === event.oid);

        if (matchSame.length > 0) {
            console.log("Duplicated bet!")
            return;
        }

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

        console.log("Placing bet!");
        console.log(this.state.bettingSlipBets);
        await Api.placeBets(this.state.bettingSlipBets)
        console.log("Placed all the bets!");

    }

    changeSportFilter = (sport) => {
        this.setState({ sportFilter: sport });
    }

    removeBets = () => {
        this.setState({ bettingSlipBets: [], showBettingSlip: false })
    }

    removeSingleBet = (bettypeOid, eventOid) => {

        const currentBets = this.state.bettingSlipBets;
        let updatedBets = currentBets.filter(bet => (bet.bettypeOid !== bettypeOid || bet.eventOid !== eventOid));

        this.setState({ bettingSlipBets: updatedBets });
    }

    updateWagerBet = (bettypeOid, eventOid, wager) => {

        console.log("Updating", wager)

        const currentBets = this.state.bettingSlipBets;
        const updatedBets = currentBets.map(b => {
            if (b.bettypeOid === bettypeOid && b.eventOid === eventOid) {
                return {
                    bettypeName: b.bettypeName,
                    bettypeOid: b.bettypeOid,
                    eventOid: b.eventOid,
                    gains: wager * b.odd,
                    name: b.name,
                    odd: b.odd,
                    wager: wager
                }
            }
            return b;
        })

        this.setState({ bettingSlipBets: updatedBets });

    }

    render() {
        const { showBettingSlip, bettingSlipBets, sportFilter } = this.state;
        let events = this.state.events;

        console.log("Eventos", events)


        events = events.filter(event => event.sportName.toLowerCase() === sportFilter.toLowerCase() || sportFilter.toLowerCase() === 'all');

        if (!events)
            return (<div></div>)

        const bettingSlipSection = (
            <div className="col-sm-3">
                <BettingSlip bets={bettingSlipBets} onPlaceBet={this.onPlaceBet}
                    removeBets={this.removeBets} removeSingleBet={this.removeSingleBet}
                    updateWagerBet={this.updateWagerBet} />
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

                            <div className="top-bar-menu">
                                <p className={sportFilter === 'All' ? 'top-bar-menu-active' : ''} onClick={() => this.changeSportFilter('All')}>All</p>
                                <p className={sportFilter === 'Football' ? 'top-bar-menu-active' : ''} onClick={() => this.changeSportFilter('Football')}>Football</p>
                                <p className={sportFilter === 'Basketball' ? 'top-bar-menu-active' : ''} onClick={() => this.changeSportFilter('Basketball')}>Basketball</p>
                                <p className={sportFilter === 'Tennis' ? 'top-bar-menu-active' : ''} onClick={() => this.changeSportFilter('Tennis')}>Tennis</p>
                            </div>


                            {events.map(event => (


                                < div className="event" >
                                    <Event event={event} addBetToBettingSlip={this.addBetToBettingSlip} onPlaceBet={this.onPlaceBet} />

                                    <Link to={'/events/' + event.eventOid}>
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