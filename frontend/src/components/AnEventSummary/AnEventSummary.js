import React, { Component } from 'react';
import CurrentEventsCarousel from '../CurrentEventsCarousel/CurrentEventsCarousel';
import AnEvent from './AnEvent/AnEvent';
import BettingSlip from '../BettingSlip/BettingSlip';
import Api from '../../api/api';

import BetTypeStruct from '../utils/bettypesstruct';

import './AnEventSummary.css';

class AnEventSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { event: {}, blocks: [] }
    }

    formatDate = (dateMillis) => {

        const date = new Date(dateMillis);
        console.log(this.state);

        //Para ser possível escrever a data usando o mês e não número
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];


        return `${monthNames[date.getMonth()]} ${date.getDate()} of ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
    }


    async componentDidMount() {

        const eventOid = this.props.match.params.eventOid || -1;

        console.log("EventOid", eventOid);

        const data = await Api.fetchAvailableBetTypesByEventOid(eventOid)
        console.log("Bettypes")
        console.log(data)

        const structBetTypes = BetTypeStruct.organize(data);

        console.log("Struct bet types", structBetTypes)


        // TODO : substituir pela API call

        this.setState({
            event: data.event,
            blocks: structBetTypes
        })

    }

    render() {

        const { blocks, event } = this.state;

        if (!blocks) {
            // Loading
            return (<div></div>);
        }

        console.log("STRUCTBETYPES", blocks)


        return (
            <div className="anevents-title">
                <div className="row">
                    <div className="col-sm-9">
                        <p className="Infodiv">{event.name}</p>

                        <div className="anevents-container shadow">
                            {blocks.map(sbt => (
                                <div key={sbt.oid} className="anevent">
                                    <div className="BetText">
                                        <p>{sbt.name}</p>
                                    </div>

                                    <AnEvent bt={sbt.bettypes} eventOid={this.props.match.params.eventOid} />

                                </div>
                            ))}

                        </div>
                    </div>
                    <div className="col-sm-3">
                        <BettingSlip />
                    </div>
                </div>
            </div>
        );
    }
}

export default AnEventSummary;