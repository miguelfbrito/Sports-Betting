import React, { Component } from 'react';

import { Formik } from 'formik';
import BetTypeStruct from '../../utils/bettypesstruct';
import Api from '../../../api/api';
import UpdateAnEvent from './UpdateAnEvent';


class EditOdds extends Component {
    constructor(props) {
        super(props);
        this.state = { event: {}, blocks: []}

    }


    async componentDidMount() {

        const eventOid = this.props.match.params.eventOid || -1;


        const data = await Api.fetchAvailableBetTypesByEventOid(eventOid);

        const structBetTypes = BetTypeStruct.organize(data);


        this.setState({
            event: data.event,
            blocks: structBetTypes
        })

    }


    changeSportFilter = (sport) => {
        this.setState({ sportFilter: sport });
    }

    formatDate = (dateMillis) => {

        const date = new Date(dateMillis);

        //Para ser possível escrever a data usando o mês e não número
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];


        return `${monthNames[date.getMonth()]} ${date.getDate()} of ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
    }


    changeSportFilter = (sport) => {
        this.setState({ sportFilter: sport });
    }

    render() {

        const { blocks, event } = this.state;

        if (!blocks) {
            // Loading
            return (<div></div>);
        }


        return (
            <div className="anevents-title">
                <div className="row">
                    <div className='col-md-12'>
                        <div className="top-bar">
                            <p className="Infodiv">{event.name}</p>
                        </div>

                        <div className="anevents-container shadow">
                            {blocks.map(sbt => (
                                <div key={sbt.oid} className="anevent">
                                    <div className="BetText">
                                        <p>{sbt.name}</p>
                                    </div>

                                    <UpdateAnEvent bt={sbt.bettypes} eventOid={this.props.match.params.eventOid}
                                        nameBT={sbt.name}
                                    />

                                </div>
                            ))}

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


export default EditOdds;