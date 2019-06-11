import React, { Component } from 'react';
import './AnEventSummary.css';
import CurrentEventsCarousel from '../CurrentEventsCarousel/CurrentEventsCarousel';
import Event from './AnEvent/AnEvent';

class AnEventSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {name : "Benfica x Porto" , events: [], "date": Date.now() }
    }

     formatDate = (dateMillis) => {

        const date = new Date(dateMillis);
        console.log(this.state);
    
        //Para ser possível escrever a data usando o mês e não número
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"];
    
    
        return `${monthNames[date.getMonth()]} ${date.getDate()} of ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
    }

    componentDidMount() {
        // TODO : substituir pela API call

        this.setState({
            events: [
                {
                    "name": "1 x 2 TR",
                    bt : [{
                    "odd1": "1- 2.85",
                    "oddX": "x- 1.85",
                    "odd2": "2- 2.15"
                    }
                    ]
                },
                {
                    "name": "1 x 2 INT",
                    bt : [{
                    "odd1": "1- 1.85",
                    "oddX": "x- 1.55",
                    "odd2": "2- 1.75"
                    }
                    ]
                }
            ]
        })

    }

    render() {

        const { events } = this.state;
        console.log(events);
        return ( 
            <div className="anevents-title">
                <p className="Infodiv">{this.state.name}</p>
                <p>{this.formatDate.bind(this.state.date)}</p>
                <div className="anevents-container shadow">
                    {events.map(event => (
                        <div className="anevent">
                            <div className="BetText">
                                <p>{event.name}</p>
                            </div>
                                <Event bt={event.bt} />
                            
                        </div>
                    ))}

                </div>
            </div>
        );
    }
}

export default AnEventSummary;