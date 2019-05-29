import React from 'react';

import './Event.css'

const formatDate = (dateMillis) => {

    const date = new Date(dateMillis);

    return `${date.getHours()}:${date.getMinutes()}`
}

const Event = (props) => {

    const { event } = props;

    return (
        <div className="event-info">
            <p className="event-name">{event.name}</p>
            <p className="event-date">{formatDate(event.date)}</p>
        </div>
    );
}

export default Event;