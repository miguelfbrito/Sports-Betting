import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './EventsSummary.css';
import CurrentEventsCarousel from '../CurrentEventsCarousel/CurrentEventsCarousel';
import Event from './Event/Event';
import EventFilter from './EventFilter/EventFilter';
import BettingSlip from '../BettingSlip/BettingSlip';

import Api from '../../api/api';

class EventsSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { events: [], loading: true, showBettingSlip: true }
    }

    async componentDidMount() {
        // TODO : substituir pela API call

        let listEvents = await Api.fetchAvailableEvents();


        // Obter dados do token


        this.setState({ events: listEvents });



        // this.setState({
        //     events: [
        //         {
        //             "name": "Arsenal x Chelsea",
        //             "odd1": "1- 2.85",
        //             "oddX": "x- 1.85",
        //             "odd2": "2- 2.15",
        //             "date": Date.now()
        //         },
        //         {
        //             "name": "Benfica x Porto",
        //             "odd1": "1- 2.10",
        //             "oddX": "x- 1.40",
        //             "odd2": "2- 2.35",
        //             "date": Date.now()
        //         },
        //         {
        //             "name": "Sporting x Braga",
        //             "odd1": "1- 1.65",
        //             "oddX": "x- 1.25",
        //             "odd2": "2- 1.95",
        //             "date": Date.now()
        //         },
        //         {
        //             "name": "Sporting x Braga",
        //             "odd1": "1- 1.65",
        //             "oddX": "x- 1.25",
        //             "odd2": "2- 1.95",
        //             "date": Date.now()
        //         },
        //         {
        //             "name": "Sporting x Braga",
        //             "odd1": "1- 1.65",
        //             "oddX": "x- 1.25",
        //             "odd2": "2- 1.95",
        //             "date": Date.now()
        //         },
        //         {
        //             "name": "Sporting x Braga",
        //             "odd1": "1- 1.65",
        //             "oddX": "x- 1.25",
        //             "odd2": "2- 1.95",
        //             "date": Date.now()
        //         }
        //     ]
        // })

    }


    render() {

        const { events, showBettingSlip } = this.state;


        console.log("Eventos", events)

        if (!events)
            return (<div></div>)


        const bettingSlipSection = (
            <div className="col-sm-3">
                <BettingSlip />
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
                                    <Event event={event} />

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