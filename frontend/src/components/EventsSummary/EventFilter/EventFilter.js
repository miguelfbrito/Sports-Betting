import React, { Component } from 'react';
import './EventFilter.css';

class EventFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (

            <div className="event-filter-container">
                <ul className="event-filters">
                    <li>All</li>
                    <li>Football</li>
                    <li>Tennis</li>
                    <li>Basketball</li>
                </ul>
                <hr />

            </div>

        );
    }
}

export default EventFilter;