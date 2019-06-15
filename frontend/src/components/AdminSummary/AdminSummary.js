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
        this.state = { events: [], createEvent: true }
    }

    async componentDidMount() {
        //Obter todos os eventos
        let listEvents = await Api.fetchAvailableEvents();

        listEvents = BetTypeStruct.organizeEventsSummary(listEvents)


        this.setState({ events: listEvents });

    }

    render() {

        const { events } = this.state;

        const listAllEvents = (
            <div>
            <p className="Infodiv">Eventos a decorrer</p>
                <div className="events-container shadow">

                    {/* Carousel 4 or 5 games */}
                    {/* <CurrentEventsCarousel /> */}

                    {/* List all events */}

                    <EventFilter />
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
                    {/*<CreateEvent />*/}
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