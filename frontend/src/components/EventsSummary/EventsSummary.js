import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import './EventsSummary.css';
import Event from './Event/Event';
import BettingSlip from '../BettingSlip/BettingSlip';

import Api from '../../api/api';
import BetTypesStruct from '../utils/bettypesstruct';
import UserHandler from '../utils/userHandler';

class EventsSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { events: [], loading: true, showBettingSlip: false, bettingSlipBets: [], sportFilter: 'All' }

        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    async componentDidMount() {
        let listEvents = await Api.fetchAvailableEvents();
        listEvents = BetTypesStruct.organizeEventsSummary(listEvents)
        this.setState({ events: listEvents });
    }

    addNotification(notification) {
        this.notificationDOMRef.current.addNotification({
            title: notification.title || "Awesomeness",
            message: notification.message || "Awesome Notifications!",
            type: notification.type || "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: notification.dismiss || 2000 },
            dismissable: { click: true }
        });
    }

    addBetToBettingSlip = (bet, event) => {

        let currentBets = this.state.bettingSlipBets;

        // Verify if it doesn't exist already

        const matchSame = currentBets.filter(b => b.bettypeOid === bet.bettypeOid && b.eventOid === event.eventOid);

        if (matchSame.length > 0) {
            console.log("Duplicated bet!")
            return;
        }

        currentBets.push({
            name: event.name,
            eventOid: event.eventOid,
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

    findEventDetailsByEventOid = (eventOid) => {
        let events = this.state.events;
        return events.filter(e => e.eventOid === eventOid)[0];
    }

    onPlaceBet = async () => {

        const betResults = await Api.placeBets(this.state.bettingSlipBets);
        betResults.map(br => {

            console.log("BRRRRRRRRRRRRRRRRRR", br)
            const event = this.findEventDetailsByEventOid(br.eventOid);
            if ('message' in br) {
                this.addNotification({
                    title: 'Error placing bet!',
                    message: br.message,
                    type: 'danger',
                    dismiss: 5000
                });
            } else {

                const data = UserHandler.get();
                const newBalance = data.balance - br.wager;
                this.props.updateBalance(newBalance);

                this.addNotification({
                    title: event.name,
                    message: 'Your bet has been placed!',
                    type: 'success',
                    dismiss: 5000
                });
            }
        })

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

    sortEventsMostRecent(events) {
        return events.sort((a, b) => {

            if (Date.parse(a.startingdate) < Date.parse(b.startingdate) && Date.now() > Date.parse(a.startingdate)) {
                return 1;
            }
            else {
                return -1
            }

        })
    }

    render() {
        const { showBettingSlip, bettingSlipBets, sportFilter } = this.state;
        let events = this.state.events;

        console.log("Eventos", events)



        events = events.filter(event => event.sportName.toLowerCase() === sportFilter.toLowerCase() || sportFilter.toLowerCase() === 'all');

        if (!events)
            return (<div></div>)

        events = this.sortEventsMostRecent(events)
        // events = events.sort((a, b) => Date.parse(a.startingdate) - Date.parse(b.startingdate));

        const bettingSlipSection = (
            <div className="col-sm-3">
                <BettingSlip bets={bettingSlipBets} onPlaceBet={this.onPlaceBet}
                    removeBets={this.removeBets} removeSingleBet={this.removeSingleBet}
                    updateWagerBet={this.updateWagerBet} />
            </div>);

        return (

            <div className="events-title">
                <ReactNotification ref={this.notificationDOMRef} />
                <div className="row">

                    {/* <button onClick={() => this.props.testFunction('asdasdasdad')}>CLICK ME</button> */}
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