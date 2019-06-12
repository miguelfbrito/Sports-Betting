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

    const buttonSection = (
        <div className="col-sm-5 events-odds">
            <button type="button" className="btn btn-info">1 (2.22)</button>
            <button type="button" className="btn btn-info">X (1.43)</button>
            <button type="button" className="btn btn-info">2 (1.10)</button>
        </div>
    )

    console.log("Props", props)

    return (
        <div className="row">
            <p className="event-date">{formatDate(event.startingdate)}</p>
            <div className="col-sm-5">
                <p className="event-info">{event.name}</p>
            </div>

            {buttonSection}
            {/* 
            <div id="view-all-bettypes-container">
                <button type="button" className="btn" id="view-all-bettypes">View</button>
            </div> */}
            {/* <div className="col-sm-5"> */}
            {/* <button id="buttonodds" onClick={handleClick.bind(this, event)}>{event.odd1}</button>
                <button id="buttonodds">{event.oddX}</button>
                <button id="buttonodds">{event.odd2}</button> */}
            {/* </div> */}

        </div>
    );
}

export default Event;