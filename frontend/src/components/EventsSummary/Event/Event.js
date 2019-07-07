
import React, { Component } from 'react';
import './Event.css'

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.onBetClick = this.onBetClick.bind(this);
    }


    formatDate = (dateMillis) => {

        const date = new Date(dateMillis);

        //Para ser possível escrever a data usando o mês e não número
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];


        return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getUTCHours()}:${date.getMinutes()}`
    }


    onBetClick = (e, bet, event) => {
        this.props.addBetToBettingSlip(bet, event);
    }


    render() {

        const { event } = this.props;

        const buttonSection = (

            <div className="col-sm-6 events-odds">
                {event.available.map(ev => (
                    <button type="button" className="btn btn-info btn-odds" onClick={(e) => this.onBetClick(e, ev, event)}>{ev.bettypeName} ({ev.odd})</button>

                ))}
            </div>
        )

        console.log("EVENT", event)

        return (
            <div className="row">
                <p className="event-date">{event.state === 'Upcoming' ? this.formatDate(event.startingdate) : this.formatDate(event.finishingdate)}</p>
                <div className="col-sm-5">
                    <p className="event-info">{event.name}</p>
                    <div className="event-info">
                        <p >{event.state === 'Upcoming' ? 'Open' : event.state}</p>
                        {event.ispremium ? <p id="premium-event"> | Premium</p> : ''}
                    </div>
                </div>

                {event.state === 'Upcoming' ? buttonSection : ''}
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
}

export default Event;
