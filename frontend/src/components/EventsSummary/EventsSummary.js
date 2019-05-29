import React, { Component } from 'react';
import './EventsSummary.css';
import CurrentEventsCarousel from '../CurrentEventsCarousel/CurrentEventsCarousel';
import Event from './Event/Event';

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
                    "date": Date.now()
                },
                {
                    "name": "Benfica x Porto",
                    "date": Date.now()
                },
                {
                    "name": "Sporting x Porto",
                    "date": Date.now()
                }
            ]
        })

    }

    render() {

        const { events } = this.state;
        return (

            <div className="events-container shadow-div">


                {/* Carousel 4 or 5 games */}
                <CurrentEventsCarousel />

                {/* List all events */}
                {events.map(event => (
                    <div className="event">
                        <Event event={event} />
                    </div>
                ))}

            </div>

        );
    }
}

export default EventsSummary;