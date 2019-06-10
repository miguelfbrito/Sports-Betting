import React, { Component } from 'react';
import './EventFilter.css';

class EventFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        return (
            
            //Colocar as imagens aqui em vez dos nomes
            <div className="event-filter-container">
                <ul className="event-filters">
                    <li className="">All</li>
                    <li className="Football">Football</li>
                    <li className="Tenis">Tenis</li>
                    <li className="Basketball">Basketball</li>
                </ul>
                <hr />

            </div>

        );
    }
}

export default EventFilter;