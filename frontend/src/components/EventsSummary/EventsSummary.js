import React, { Component } from 'react';
import './EventsSummary.css';
import CurrentEventsCarousel from '../CurrentEventsCarousel/CurrentEventsCarousel';
import Event from './Event/Event';
import EventFilter from './EventFilter/EventFilter';

class EventsSummary extends Component {
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

                    {events.map(event => (
                        <div className="event">
                            <Event event={event} />
                        </div>
                    ))}

                </div>
            </div>
        );
    }
}

export default EventsSummary;