import React from 'react';


const Event = (props) => {

    const { event } = props;

    return (
        <div>
            <p>{event.name}</p>
            <p>{event.date}</p>
        </div>
    );
}

export default Event;