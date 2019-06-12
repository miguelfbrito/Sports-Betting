import React, { Component } from 'react';
import './AdminSummary.css';
import CurrentEventsCarousel from '../CurrentEventsCarousel/CurrentEventsCarousel';
import Event from '../EventsSummary/Event/Event';
import CreateEvent from '../AdminSummary/AddEvents/AddEvents';
import EventFilter from '../EventsSummary/EventFilter/EventFilter';


class AdminSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { events: [] }
    }

    componentDidMount() {
        // TODO : substituir pela API call

        this.setState({
            events: [
                {
                    "name": "Arsenal x Chelsea",
                    "odd1": "1- 2.85",
                    "oddX": "x- 1.85",
                    "odd2": "2- 2.15",
                    "date": Date.now()
                },
                {
                    "name": "Benfica x Porto",
                    "odd1": "1- 2.10",
                    "oddX": "x- 1.40",
                    "odd2": "2- 2.35",
                    "date": Date.now()
                },
                {
                    "name": "Sporting x Braga",
                    "odd1": "1- 1.65",
                    "oddX": "x- 1.25",
                    "odd2": "2- 1.95",
                    "date": Date.now()
                }
            ]
        })

    }

    render() {

        const { events } = this.state;
        return (
            <div className="events-title">
                <p className="Infodiv">Eventos a decorrer</p>
                <div className="events-container shadow">

                    {/* Carousel 4 or 5 games */}
                    {/* <CurrentEventsCarousel /> */}

                    {/* List all events */}

                    <EventFilter />
                    <CreateEvent ></CreateEvent>
                    {/*{events.map(event => (
                        <div className="admin-event">
                            <Event event={event} />
                            <button id="button">Edit odds</button>
                            <button id="button">Add bets</button>
                            <button id="button">Close Event</button>
                            <button id="button">Delete</button>
                            <hr ></hr>
                        </div>
                    ))}*/}

                </div>
            </div>
        );
    }
}

export default AdminSummary;