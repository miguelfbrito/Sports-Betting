import React, { Component } from 'react';
import './AdminSummary.css';
import CurrentEventsCarousel from '../CurrentEventsCarousel/CurrentEventsCarousel';
import Event from './AdminEvent/AdminEvent';
import CreateEvent from '../AdminSummary/AddEvents/AddEvents';
import EventFilter from '../EventsSummary/EventFilter/EventFilter';
import Api from '../../api/api';
import BetTypeStruct from '../utils/bettypesstruct';
import EditEvent from './EditEvent/EditEvent';


class AdminSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { events: [], createEvent: false, sportFilter: 'All'  }
    }

    async componentDidMount() {
        //Obter todos os eventos
        let listEvents = await Api.fetchAvailableEvents();

        listEvents = BetTypeStruct.organizeEventsSummary(listEvents)


        this.setState({ events: listEvents });

    }

    changeSportFilter = (sport) => {
        this.setState({ sportFilter: sport });
    }


    render() {
        const { sportFilter } = this.state;
        let events = this.state.events;

        console.log("Eventos", events)


        events = events.filter(event => event.sportName.toLowerCase() === sportFilter.toLowerCase() || sportFilter.toLowerCase() === 'all');

        const listAllEvents = (
            <div>
            <p className="Infodiv">Eventos a decorrer</p>
                <div className="events-container shadow">

                    <div className="top-bar-menu">
                        <p className={sportFilter === 'All' ? 'top-bar-menu-active' : ''} onClick={() => this.changeSportFilter('All')}>All</p>
                        <p className={sportFilter === 'Football' ? 'top-bar-menu-active' : ''} onClick={() => this.changeSportFilter('Football')}>Football</p>
                        <p className={sportFilter === 'Basketball' ? 'top-bar-menu-active' : ''} onClick={() => this.changeSportFilter('Basketball')}>Basketball</p>
                    </div>

                    {events.map(event => (
                        <div className="admin-event">
                            <Event event={event} />
                            
                            <hr ></hr>
                        </div>
                    ))}
                </div>
            </div>
        )

        const createAnEvent = (
            <div>
            <p className="Infodiv">Create new event</p>
                <div className="events-container shadow">
                    <EditEvent />
                </div>
            </div>
        )


        return (
            <div className="events-title">
                {!this.state.createEvent ? listAllEvents : ''}
                {this.state.createEvent ? createAnEvent : ''}
            </div>
        );
    }
}

export default AdminSummary;