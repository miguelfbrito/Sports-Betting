
import React, { Component } from 'react';
import '../../EventsSummary/Event/Event.css'

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }


    formatDate = (dateMillis) => {

        const date = new Date(dateMillis);

        //Para ser possível escrever a data usando o mês e não número
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];


        return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getHours()}:${date.getMinutes()}`
    }


    render() {

        const { event } = this.props;

        const buttonSection = (

            <div className="col-sm-6 events-odds">

                <button type="button" className="btn btn-info btn-odds">Edit odds</button>
                <button type="button" className="btn btn-info btn-odds">Add bet types</button>
                <button type="button" className="btn btn-info btn-odds">Close</button>
                <button type="button" className="btn btn-info btn-odds">Delete</button>

            </div>
        )


        return (
            <div className="row">
                <p className="event-date">{this.formatDate(event.startingdate)}</p>
                <div className="col-sm-6" >
                    <p className="event-info">{event.name}</p>
                </div>

                {buttonSection}

            </div>
        );
    }
}

export default Event;
