import React, { Component } from 'react';

import './EventStats.css';

import { Formik } from 'formik';
import Api from '../../../api/api';

class EventStats extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }
  
    componentDidMount() {
        /*this.setState({
            id: 1,
            homegoals: 1,
            awaygoals: 0,
            awayyellowcards: 0,
            homeyellowcards: 3,
            awayredcards: 0,
            homeredcards: 1,
            createdAt: "2019-06-15T23:36:39.000Z",
            updatedAt: "2019-06-15T23:36:39.000Z",
            sport: "football"
        });*/

        this.setState({
            id: 1,
            homepoints: 70,
            awaypoints: 51,
            awaytriplepoints: 30,
            hometriplepoints: 46,
            createdAt: "2019-06-15T23:36:39.000Z",
            updatedAt: "2019-06-15T23:36:39.000Z",
            sport: "basketball"
        });

    }
  
  
  render() {

    const showFootball = (
        <div>
            <div className="row">
            <div className="col-sm-3">
            <p className="stats-titles">Result:</p>
            </div>
            <div className="col-sm-3">
            <p className="stats-info">{this.state.homegoals} - {this.state.awaygoals}</p>
            </div>
            </div>
            <hr />
            <div className="row">
            <div className="col-sm-3">
            <p className="stats-titles">Yellow Cards:</p>
            </div>
            <div className="col-sm-3">
            <p className="stats-info">{this.state.homeyellowcards + this.state.awayyellowcards}</p>
            <p className="stats-info">Home: ({this.state.homeyellowcards}) Away: ({this.state.awayyellowcards})</p>
            </div>
            </div>
            <hr />
            <div className="row">
            <div className="col-sm-3">
            <p className="stats-titles">Red Cards:</p>
            </div>
            <div className="col-sm-3">
            <p className="stats-info">{this.state.homeredcards + this.state.awayredcards}</p>
            <p className="stats-info">Home: ({this.state.homeredcards}) Away: ({this.state.awayredcards})</p>
            </div>
            </div>
        </div>
    );

    const showBasketball = (
        <div>
        <div className="row">
        <div className="col-sm-3">
        <p className="stats-titles">Result:</p>
        </div>
        <div className="col-sm-3">
        <p className="stats-info">{this.state.homepoints} - {this.state.awaypoints}</p>
        </div>
        </div>
        <hr />
        <div className="row">
        <div className="col-sm-3">
        <p className="stats-titles">Home Triple Points:</p>
        </div>
        <div className="col-sm-3">
        <p className="stats-info">{this.state.hometriplepoints}</p>
        </div>
        </div>
        <hr />
        <div className="row">
        <div className="col-sm-3">
        <p className="stats-titles">Away Triple Points:</p>
        </div>
        <div className="col-sm-3">
        <p className="stats-info">{this.state.awaytriplepoints}</p>
        </div>
        </div>
        <hr />
        <div className="row">
        <div className="col-sm-3">
        <p className="stats-titles">Total Triple Points:</p>
        </div>
        <div className="col-sm-3">
        <p className="stats-info">{this.state.hometriplepoints + this.state.awaytriplepoints}</p>
        </div>
        </div>
    </div>
    );

    return (
        <div>
            {this.state.sport === "football" ? showFootball: ''}
            {this.state.sport === "basketball" ? showBasketball: ''}
        </div>
    );
}
}
export default EventStats;