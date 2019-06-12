import React, { Component } from 'react';
import './AnEventSummary.css';
import CurrentEventsCarousel from '../CurrentEventsCarousel/CurrentEventsCarousel';
import Event from './AnEvent/AnEvent';
import Makebet from '../MakeBet/makebet';

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
                    "1": "2.85",
                    "X": "1.85",
                    "2": "2.15"
                    }
                    ]
                },
                {
                    "name": "1 x 2 INT",
                    bt : [{
                    "1": "2.85",
                    "X": "1.85"
                    }
                    ]
                },
                {
                    "name": "Goals",
                    bt : [{
                    "-1.5 goals": "1.85",
                    "+1.5 goals": "1.55",
                    "-2.5 goals": "1.75",
                    "+2.5 goals": "1.85",
                    "-3.5 goals": "2.15",
                    "+3.5 goals": "2.85",
                    "+4.5 goals": "1.85",
                    }
                    ]
                }
            ]
        })

    }

    render() {

        const { events } = this.state;
        
        return ( 
            <div className="anevents-title">
            <div className="row">
            <div className="col-sm-9">
                <p className="Infodiv">{this.state.name}</p>
                <p>{this.formatDate.bind(this.state.date)}</p>
                <div style={{height: "450px", overflowY: "scroll", overflowX:"hidden"}} className="anevents-container shadow">
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
        <div className="col-sm-3">
                        <Makebet />
        </div>
        </div>
        </div>
        );
    }
}

export default AnEventSummary;