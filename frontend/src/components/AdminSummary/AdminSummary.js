import React, { Component } from 'react';
import './AdminSummary.css';
import CurrentEventsCarousel from '../CurrentEventsCarousel/CurrentEventsCarousel';
import Event from './AdminEvent/AdminEvent';
import CreateEvent from '../AdminSummary/AddEvents/AddEvents';
import EventFilter from '../EventsSummary/EventFilter/EventFilter';
import Api from '../../api/api';
import BetTypeStruct from '../utils/bettypesstruct';


class AdminSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { events: [], createEvent: true, sportFilter: 'All' }
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
                <div className="top-bar">
                    <p className="Infodiv">Events</p>
                </div>
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
                <div className="top-bar">
                <p className="Infodiv">Create new event</p>
                </div>
                <div className="events-container shadow">
                    <CreateEvent />
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