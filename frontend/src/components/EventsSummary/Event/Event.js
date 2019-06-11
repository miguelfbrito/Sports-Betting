import React from 'react';

import './Event.css'
import Bet from '../../MakeBet/makebet';

const formatDate = (dateMillis) => {

    const date = new Date(dateMillis);

    //Para ser possível escrever a data usando o mês e não número
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];


    return `${monthNames[date.getMonth()]} ${date.getDate()} of ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
}


    function handleClick(e) {
        //Chamar o makebet e passar o e para lá
    }


const Event = (props) => {

    const { event } = props;

    return (
        <div className="row">
        <p className="event-date">{formatDate(event.date)}</p>
        <div className="col-sm-5">
            <p className="event-info">{event.name}</p>
        </div>
        <div className="col-sm-7">
            <button id="buttonodds" onClick={handleClick.bind(this, event)}>{event.odd1}</button>
            <button id="buttonodds">{event.oddX}</button>
            <button id="buttonodds">{event.odd2}</button>
            <button id="buttonDetails"></button>
        </div>
        </div>
    );
}

export default Event;